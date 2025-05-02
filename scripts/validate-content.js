/**
 * Content validation script for Plurality Tokyo Website
 * 
 * This script validates the structure and required fields of content files
 * to ensure they meet the project's content guidelines.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

const contentDirs = ['content/events', 'content/articles', 'content/authors'];

const requiredFields = {
  events: ['title', 'date', 'description', 'location'],
  articles: ['title', 'date', 'description', 'author'],
  authors: ['name', 'bio', 'avatar']
};

const allowedFields = {
  events: ['title', 'date', 'description', 'location', 'speakers', 'tags', 'coverImage', 'youtubeUrl', 'isUpcoming', 'slug'],
  articles: ['title', 'date', 'description', 'author', 'tags', 'coverImage', 'slug'],
  authors: ['name', 'bio', 'avatar', 'website', 'twitter', 'github', 'linkedin', 'slug']
};

async function validateContent() {
  let hasErrors = false;

  for (const dir of contentDirs) {
    const contentType = dir.split('/')[1]; // events, articles, or authors
    const files = glob.sync(`${dir}/**/*.{md,mdx}`);
    
    console.log(`\nValidating ${files.length} ${contentType} files...`);
    
    for (const file of files) {
      const fileContent = fs.readFileSync(file, 'utf8');
      const { data } = matter(fileContent);
      const fileName = path.basename(file);
      
      const missingFields = requiredFields[contentType].filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        console.error(`❌ ${fileName}: Missing required fields: ${missingFields.join(', ')}`);
        hasErrors = true;
      }
      
      const unknownFields = Object.keys(data).filter(field => !allowedFields[contentType].includes(field));
      
      if (unknownFields.length > 0) {
        console.warn(`⚠️ ${fileName}: Contains unknown fields: ${unknownFields.join(', ')}`);
      }
      
      if (data.date && !(data.date instanceof Date) && isNaN(new Date(data.date).getTime())) {
        console.error(`❌ ${fileName}: Invalid date format: ${data.date}`);
        hasErrors = true;
      }
    }
  }
  
  if (hasErrors) {
    console.error('\n❌ Content validation failed. Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\n✅ Content validation passed!');
  }
}

validateContent().catch(err => {
  console.error('Error during content validation:', err);
  process.exit(1);
});
