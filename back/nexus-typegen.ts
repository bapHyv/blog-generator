/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Article: { // root type
    content: string; // String!
    createdAt: string; // String!
    id: number; // Int!
    isPublished: boolean; // Boolean!
    label: string; // String!
    publishedAt: string; // String!
    updatedAt: string; // String!
  }
  ArticleComment: { // root type
    content: string; // String!
    createdAt: string; // String!
    id: number; // Int!
    isValidated: boolean; // Boolean!
    note?: number | null; // Int
  }
  Category: { // root type
    id: number; // Int!
    label: string; // String!
  }
  Image: { // root type
    createdAt: string; // String!
    id: number; // Int!
    url: string; // String!
  }
  Query: {};
  Redacteur: { // root type
    BlogLabel: string; // String!
    avatar: string; // String!
    createdAt: string; // String!
    description: string; // String!
    email: string; // String!
    id: number; // Int!
    password: string; // String!
    pseudo: string; // String!
    role: string; // String!
  }
  Tag: { // root type
    id: number; // Int!
    label: string; // String!
  }
  WriterComment: { // root type
    content: string; // String!
    createdAt: string; // String!
    id: number; // Int!
    isValidated: boolean; // Boolean!
    note?: number | null; // Int
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Article: { // field return type
    content: string; // String!
    createdAt: string; // String!
    id: number; // Int!
    isPublished: boolean; // Boolean!
    label: string; // String!
    publishedAt: string; // String!
    updatedAt: string; // String!
  }
  ArticleComment: { // field return type
    content: string; // String!
    createdAt: string; // String!
    id: number; // Int!
    isValidated: boolean; // Boolean!
    note: number | null; // Int
  }
  Category: { // field return type
    id: number; // Int!
    label: string; // String!
  }
  Image: { // field return type
    createdAt: string; // String!
    id: number; // Int!
    url: string; // String!
  }
  Query: { // field return type
    ok: boolean; // Boolean!
  }
  Redacteur: { // field return type
    BlogLabel: string; // String!
    avatar: string; // String!
    createdAt: string; // String!
    description: string; // String!
    email: string; // String!
    id: number; // Int!
    password: string; // String!
    pseudo: string; // String!
    role: string; // String!
  }
  Tag: { // field return type
    id: number; // Int!
    label: string; // String!
  }
  WriterComment: { // field return type
    content: string; // String!
    createdAt: string; // String!
    id: number; // Int!
    isValidated: boolean; // Boolean!
    note: number | null; // Int
  }
}

export interface NexusGenFieldTypeNames {
  Article: { // field return type name
    content: 'String'
    createdAt: 'String'
    id: 'Int'
    isPublished: 'Boolean'
    label: 'String'
    publishedAt: 'String'
    updatedAt: 'String'
  }
  ArticleComment: { // field return type name
    content: 'String'
    createdAt: 'String'
    id: 'Int'
    isValidated: 'Boolean'
    note: 'Int'
  }
  Category: { // field return type name
    id: 'Int'
    label: 'String'
  }
  Image: { // field return type name
    createdAt: 'String'
    id: 'Int'
    url: 'String'
  }
  Query: { // field return type name
    ok: 'Boolean'
  }
  Redacteur: { // field return type name
    BlogLabel: 'String'
    avatar: 'String'
    createdAt: 'String'
    description: 'String'
    email: 'String'
    id: 'Int'
    password: 'String'
    pseudo: 'String'
    role: 'String'
  }
  Tag: { // field return type name
    id: 'Int'
    label: 'String'
  }
  WriterComment: { // field return type name
    content: 'String'
    createdAt: 'String'
    id: 'Int'
    isValidated: 'Boolean'
    note: 'Int'
  }
}

export interface NexusGenArgTypes {
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}