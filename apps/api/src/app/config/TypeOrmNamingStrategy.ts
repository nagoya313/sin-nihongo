import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import pluralize from 'pluralize';

export default class TypeOrmNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName: string | undefined) {
    return userSpecifiedName || pluralize.plural(snakeCase(targetName));
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]) {
    return snakeCase(embeddedPrefixes.join('_')) + (customName || snakeCase(propertyName));
  }

  relationName(propertyName: string) {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string) {
    return snakeCase(pluralize.singular(relationName) + '_' + referencedColumnName);
  }

  joinTableName(firstTableName: string, secondTableName: string) {
    return snakeCase(firstTableName + '_' + secondTableName);
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string) {
    return snakeCase(pluralize.singular(tableName) + '_' + (columnName || propertyName));
  }

  classTableInheritanceParentColumnName(parentTableName: string, parentTableIdPropertyName: string) {
    return snakeCase(pluralize.singular(parentTableName) + '_' + parentTableIdPropertyName);
  }
}
