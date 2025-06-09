const fs = require('fs').promises;
const path = require('path');

// Product categories to process
const PRODUCT_CATEGORIES = [
  'Webex-Contact-Center',
  'Devices',
  'Webex-Admin',
  'Webex-Calling',
  'Webex-Meetings',
  'Webex-Messaging'
];

// Main function to merge specs
async function mergeSpecs() {
  try {
    await fs.mkdir('merged-specs', { recursive: true });

    for (const category of PRODUCT_CATEGORIES) {
      console.log(`Processing ${category}...`);
      
      const mergedSpec = {
        openapi: '3.0.0',
        info: {
          title: `${category} API Specification`,
          version: '1.0.0',
          description: `Combined API specification for ${category}`
        },
        tags: [],
        paths: {},
        components: {
          schemas: {},
          securitySchemes: {},
          parameters: {},
          responses: {},
          requestBodies: {}
        }
      };

      // Find and process all spec.json files for this category
      const specs = await findSpecFiles(category);
      console.log(`Found ${specs.length} spec files for ${category}`);

      // Process shared specs first
      const sharedSpecs = await processSharedSpecs(category);
      if (Object.keys(sharedSpecs.components || {}).length > 0) {
        console.log(`Found shared components for ${category}`);
        mergeComponents(mergedSpec, sharedSpecs);
      }

      // Process each spec file
      for (const specFile of specs) {
        const subCategory = path.relative('api-spec', path.dirname(specFile))
          .split(path.sep)
          .slice(1)
          .join('/');
        
        console.log(`Processing ${subCategory}...`);
        await processSpecFile(specFile, mergedSpec);
      }

      // Write the merged spec to file
      const outputPath = path.join('merged-specs', `${category.toLowerCase()}-combined.json`);
      await fs.writeFile(
        outputPath,
        JSON.stringify(mergedSpec, null, 2),
        'utf8'
      );
      
      console.log(`Created merged spec: ${outputPath}`);
    }
  } catch (error) {
    console.error('Error merging specs:', error);
  }
}

// Find all spec.json and v1/spec.json files for a category
async function findSpecFiles(category) {
  const specs = [];
  const baseDir = path.join('api-spec');
  let categoryPath;

  // Handle different directory structures
  if (category === 'Webex-Admin') {
    categoryPath = path.join(baseDir, 'Others', 'Webex-Admin');
  } else if (category === 'Webex-Contact-Center') {
    categoryPath = path.join(baseDir, 'Customer-Experience', 'Webex-Contact-Center');
  } else if (category.startsWith('Webex-')) {
    categoryPath = path.join(baseDir, 'Webex-Suite', category);
  } else {
    categoryPath = path.join(baseDir, category);
  }

  async function searchDir(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          if (entry.name === 'v1') {
            // Check for spec.json in version directory
            const specPath = path.join(fullPath, 'spec.json');
            try {
              await fs.access(specPath);
              specs.push(specPath);
            } catch {
              // spec.json doesn't exist in version directory
            }
          } else {
            // Continue searching in other directories
            await searchDir(fullPath);
          }
        } else if (entry.name === 'spec.json') {
          specs.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not access directory ${dir}:`, error.message);
    }
  }

  try {
    await searchDir(categoryPath);
  } catch (error) {
    console.warn(`Warning: Could not find category directory ${categoryPath}:`, error.message);
  }

  return specs;
}

// Process shared specs from the Shared directory
async function processSharedSpecs(category) {
  const sharedSpec = {
    components: {
      schemas: {},
      parameters: {},
      responses: {},
      requestBodies: {}
    }
  };

  const sharedDir = path.join('api-spec', 'Shared');
  
  try {
    const entries = await fs.readdir(sharedDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Look for v1/spec.json or shared.json
        const v1SpecPath = path.join(sharedDir, entry.name, 'v1', 'spec.json');
        const sharedJsonPath = path.join(sharedDir, entry.name, 'shared.json');
        
        try {
          let content;
          try {
            content = await fs.readFile(v1SpecPath, 'utf8');
          } catch {
            content = await fs.readFile(sharedJsonPath, 'utf8');
          }
          
          const spec = JSON.parse(content);
          mergeComponents(sharedSpec, spec);
        } catch (error) {
          // Skip if neither file exists or can't be parsed
          continue;
        }
      }
    }
  } catch (error) {
    console.warn('Warning: Could not process shared specs:', error.message);
  }

  return sharedSpec;
}

// Process and merge a single spec file
async function processSpecFile(specFile, mergedSpec) {
  try {
    const content = await fs.readFile(specFile, 'utf8');
    const spec = JSON.parse(content);
    
    // Collect global tag definitions
    if (spec.tags) {
      const existingTagNames = new Set(mergedSpec.tags.map(t => t.name));
      for (const tag of spec.tags) {
        if (!existingTagNames.has(tag.name)) {
          mergedSpec.tags.push(tag);
          existingTagNames.add(tag.name);
        }
      }
    }

    // Merge paths and add tags to operations
    if (spec.paths) {
      for (const [pathKey, pathOperations] of Object.entries(spec.paths)) {
        if (!mergedSpec.paths[pathKey]) {
          mergedSpec.paths[pathKey] = {};
        }
        for (const [method, operationDetails] of Object.entries(pathOperations)) {
          // Ensure the operation exists in mergedSpec
          if (!mergedSpec.paths[pathKey][method]) {
            mergedSpec.paths[pathKey][method] = {};
          }
          // Merge all operation details
          Object.assign(mergedSpec.paths[pathKey][method], operationDetails);

          // Add tags from spec.tags to this specific operation
          if (spec.tags && spec.tags.length > 0) {
            if (!mergedSpec.paths[pathKey][method].tags) {
              mergedSpec.paths[pathKey][method].tags = [];
            }
            const operationTagNames = new Set(mergedSpec.paths[pathKey][method].tags);
            for (const tag of spec.tags) {
              if (!operationTagNames.has(tag.name)) {
                mergedSpec.paths[pathKey][method].tags.push(tag.name);
                operationTagNames.add(tag.name);
              }
            }
          }
        }
      }
    }
    
    // Merge components
    mergeComponents(mergedSpec, spec);
    
  } catch (error) {
    console.error(`Error processing spec file ${specFile}:`, error);
  }
}

// Merge components from source into target
function mergeComponents(target, source) {
  if (!source.components) return;
  
  for (const [category, components] of Object.entries(source.components)) {
    if (!target.components[category]) {
      target.components[category] = {};
    }
    Object.assign(target.components[category], components);
  }
}

// Execute the script
mergeSpecs().then(() => {
  console.log('Finished merging specs');
}).catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
