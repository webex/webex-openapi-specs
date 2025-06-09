const fs = require('fs');
const path = require('path');

function findSpecFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.name === 'spec.json') {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function updateSpecTags() {
  const specFiles = findSpecFiles('api-spec');
  console.log(`Found ${specFiles.length} spec.json files`);
  
  for (const filePath of specFiles) {
    try {
      // Get the folder name 2 levels up
      const pathParts = path.dirname(filePath).split(path.sep);
      const tagName = pathParts[pathParts.length - 2];
      
      // Read and parse the spec file
      const spec = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Initialize tags array if it doesn't exist
      if (!spec.tags) {
        spec.tags = [];
      }
      
      // Remove any existing tags with the same name
      spec.tags = spec.tags.filter((tag, index) => {
        // Keep only the first occurrence of a tag with this name
        return spec.tags.findIndex(t => t.name === tag.name) === index;
      });

      // Check if our tag already exists
      const newTag = {
        name: tagName,
        description: `APIs related to ${tagName}`
      };
      
      const tagExists = spec.tags.some(tag => 
        tag.name === newTag.name && tag.description === newTag.description
      );
      
      if (!tagExists) {
        spec.tags.push(newTag);
      }
      
      // Write back to file with proper formatting
      fs.writeFileSync(filePath, JSON.stringify(spec, null, 2));
      console.log(`Updated ${filePath}: removed duplicates and ensured tag ${tagName} exists`);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }
}

updateSpecTags();
