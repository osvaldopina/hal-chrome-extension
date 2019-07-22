import { PropertyDefinition } from './schema-properties-generator/schemaPropertiesGenerator';
import { parsePropertyDefinition } from './schema-properties-parser/schemaPropertiesParser';
import { merge } from './schema-properties-merger/schemaPropertiesMerger';

export function createSchema(halFormProperties: Array<PropertyDefinition>): object {
  const formPropertySchemas = [];
  halFormProperties.forEach((halFormPropertyDefinition) => {
    formPropertySchemas.push(parsePropertyDefinition(halFormPropertyDefinition).generateSchema());
  });

  return merge(formPropertySchemas);
}
