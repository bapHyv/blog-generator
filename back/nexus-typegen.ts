/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


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
  DateTime: any
}

export interface NexusGenObjects {
  Article: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isPublished: boolean; // Boolean!
    label: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  ArticleComment: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isValidated: boolean; // Boolean!
    note?: number | null; // Int
  }
  AuthPayload: { // root type
    token: string; // String!
    writer: NexusGenRootTypes['Writer']; // Writer!
  }
  Category: { // root type
    id: number; // Int!
    label: string; // String!
  }
  Follow: { // root type
    id: number; // Int!
  }
  Image: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    url: string; // String!
  }
  Mutation: {};
  Query: {};
  Writer: { // root type
    avatar: string; // String!
    blogLabel: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    email: string; // String!
    id: number; // Int!
    password: string; // String!
    pseudo: string; // String!
    role: string; // String!
  }
  WriterComment: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
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
    comments: NexusGenRootTypes['ArticleComment'][] | null; // [ArticleComment!]
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isPublished: boolean; // Boolean!
    label: string; // String!
    publishedBy: NexusGenRootTypes['Writer'] | null; // Writer
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  ArticleComment: { // field return type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isValidated: boolean; // Boolean!
    note: number | null; // Int
    publishedBy: NexusGenRootTypes['Writer'] | null; // Writer
    publishedOn: NexusGenRootTypes['Article'] | null; // Article
  }
  AuthPayload: { // field return type
    token: string; // String!
    writer: NexusGenRootTypes['Writer']; // Writer!
  }
  Category: { // field return type
    id: number; // Int!
    label: string; // String!
    writers: Array<NexusGenRootTypes['Writer'] | null> | null; // [Writer]
  }
  Follow: { // field return type
    followed: NexusGenRootTypes['Writer'] | null; // Writer
    following: NexusGenRootTypes['Writer'] | null; // Writer
    id: number; // Int!
  }
  Image: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    ownedBy: NexusGenRootTypes['Writer'] | null; // Writer
    url: string; // String!
  }
  Mutation: { // field return type
    addOneImage: NexusGenRootTypes['Image']; // Image!
    changeArticleVisibility: NexusGenRootTypes['Article']; // Article!
    createOneArticle: NexusGenRootTypes['Article']; // Article!
    createOneArticleComment: NexusGenRootTypes['ArticleComment']; // ArticleComment!
    createOneCategory: NexusGenRootTypes['Category']; // Category!
    createOneWriterComment: NexusGenRootTypes['WriterComment']; // WriterComment!
    deleteOneArticle: NexusGenRootTypes['Article']; // Article!
    deleteOneArticleComment: NexusGenRootTypes['WriterComment']; // WriterComment!
    deleteOneCategory: NexusGenRootTypes['Category']; // Category!
    deleteOneImage: NexusGenRootTypes['Image']; // Image!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    register: NexusGenRootTypes['Writer']; // Writer!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updateOneArticle: NexusGenRootTypes['Article']; // Article!
    updateOneArticleComment: NexusGenRootTypes['ArticleComment']; // ArticleComment!
    updateOneCategory: NexusGenRootTypes['Category']; // Category!
    updateOneWriterComment: NexusGenRootTypes['WriterComment']; // WriterComment!
    updateWriter: NexusGenRootTypes['Writer']; // Writer!
    validateOneComment: NexusGenRootTypes['WriterComment']; // WriterComment!
  }
  Query: { // field return type
    getAllArticles: NexusGenRootTypes['Article'][]; // [Article!]!
    getAllCategories: NexusGenRootTypes['Category'][]; // [Category!]!
    getAllComments: NexusGenRootTypes['ArticleComment'][]; // [ArticleComment!]!
    getAllImages: Array<NexusGenRootTypes['Image'] | null> | null; // [Image]
    getAllWriterComments: NexusGenRootTypes['WriterComment'][]; // [WriterComment!]!
    getAllWriters: NexusGenRootTypes['Writer'][]; // [Writer!]!
    getOneArticle: NexusGenRootTypes['Article'] | null; // Article
    getOneCategory: NexusGenRootTypes['Category'] | null; // Category
    getOneComment: NexusGenRootTypes['ArticleComment'] | null; // ArticleComment
    getOneImage: NexusGenRootTypes['Image'] | null; // Image
    getOneWriter: NexusGenRootTypes['Writer'] | null; // Writer
    getOneWritterComment: NexusGenRootTypes['WriterComment'] | null; // WriterComment
  }
  Writer: { // field return type
    articles: Array<NexusGenRootTypes['Article'] | null> | null; // [Article]
    avatar: string; // String!
    blogLabel: string; // String!
    category: NexusGenRootTypes['Category'] | null; // Category
    commentsFromWriters: Array<NexusGenRootTypes['ArticleComment'] | null> | null; // [ArticleComment]
    commentsOnArticles: Array<NexusGenRootTypes['ArticleComment'] | null> | null; // [ArticleComment]
    commentsOnWriters: Array<NexusGenRootTypes['ArticleComment'] | null> | null; // [ArticleComment]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    email: string; // String!
    followers: Array<NexusGenRootTypes['Follow'] | null> | null; // [Follow]
    following: Array<NexusGenRootTypes['Follow'] | null> | null; // [Follow]
    id: number; // Int!
    images: Array<NexusGenRootTypes['Image'] | null> | null; // [Image]
    password: string; // String!
    pseudo: string; // String!
    role: string; // String!
  }
  WriterComment: { // field return type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isValidated: boolean; // Boolean!
    note: number | null; // Int
    writtenBy: NexusGenRootTypes['Writer'] | null; // Writer
    writtenOn: NexusGenRootTypes['Writer'] | null; // Writer
  }
}

export interface NexusGenFieldTypeNames {
  Article: { // field return type name
    comments: 'ArticleComment'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    isPublished: 'Boolean'
    label: 'String'
    publishedBy: 'Writer'
    updatedAt: 'DateTime'
  }
  ArticleComment: { // field return type name
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    isValidated: 'Boolean'
    note: 'Int'
    publishedBy: 'Writer'
    publishedOn: 'Article'
  }
  AuthPayload: { // field return type name
    token: 'String'
    writer: 'Writer'
  }
  Category: { // field return type name
    id: 'Int'
    label: 'String'
    writers: 'Writer'
  }
  Follow: { // field return type name
    followed: 'Writer'
    following: 'Writer'
    id: 'Int'
  }
  Image: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    ownedBy: 'Writer'
    url: 'String'
  }
  Mutation: { // field return type name
    addOneImage: 'Image'
    changeArticleVisibility: 'Article'
    createOneArticle: 'Article'
    createOneArticleComment: 'ArticleComment'
    createOneCategory: 'Category'
    createOneWriterComment: 'WriterComment'
    deleteOneArticle: 'Article'
    deleteOneArticleComment: 'WriterComment'
    deleteOneCategory: 'Category'
    deleteOneImage: 'Image'
    login: 'AuthPayload'
    register: 'Writer'
    signup: 'AuthPayload'
    updateOneArticle: 'Article'
    updateOneArticleComment: 'ArticleComment'
    updateOneCategory: 'Category'
    updateOneWriterComment: 'WriterComment'
    updateWriter: 'Writer'
    validateOneComment: 'WriterComment'
  }
  Query: { // field return type name
    getAllArticles: 'Article'
    getAllCategories: 'Category'
    getAllComments: 'ArticleComment'
    getAllImages: 'Image'
    getAllWriterComments: 'WriterComment'
    getAllWriters: 'Writer'
    getOneArticle: 'Article'
    getOneCategory: 'Category'
    getOneComment: 'ArticleComment'
    getOneImage: 'Image'
    getOneWriter: 'Writer'
    getOneWritterComment: 'WriterComment'
  }
  Writer: { // field return type name
    articles: 'Article'
    avatar: 'String'
    blogLabel: 'String'
    category: 'Category'
    commentsFromWriters: 'ArticleComment'
    commentsOnArticles: 'ArticleComment'
    commentsOnWriters: 'ArticleComment'
    createdAt: 'DateTime'
    description: 'String'
    email: 'String'
    followers: 'Follow'
    following: 'Follow'
    id: 'Int'
    images: 'Image'
    password: 'String'
    pseudo: 'String'
    role: 'String'
  }
  WriterComment: { // field return type name
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    isValidated: 'Boolean'
    note: 'Int'
    writtenBy: 'Writer'
    writtenOn: 'Writer'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addOneImage: { // args
      url: string; // String!
      writerId: number; // Int!
    }
    changeArticleVisibility: { // args
      id: number; // Int!
      isPublished: boolean; // Boolean!
    }
    createOneArticle: { // args
      content: string; // String!
      isPublished: boolean; // Boolean!
      label: string; // String!
      writerId: number; // Int!
    }
    createOneArticleComment: { // args
      articleId: number; // Int!
      content: string; // String!
      note?: number | null; // Int
      writerId: number; // Int!
    }
    createOneCategory: { // args
      label: string; // String!
    }
    createOneWriterComment: { // args
      content: string; // String!
      note?: number | null; // Int
      writerIdBeingCommented: number; // Int!
      writerIdHasCommented: number; // Int!
    }
    deleteOneArticle: { // args
      id: number; // Int!
    }
    deleteOneArticleComment: { // args
      commentId: number; // Int!
    }
    deleteOneCategory: { // args
      label: string; // String!
    }
    deleteOneImage: { // args
      id: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      avatar: string; // String!
      blogLabel: string; // String!
      categoryId: number; // Int!
      description: string; // String!
      email: string; // String!
      password: string; // String!
      pseudo: string; // String!
      role: string; // String!
    }
    signup: { // args
      avatar: string; // String!
      blogLabel: string; // String!
      categoryId: number; // Int!
      description: string; // String!
      email: string; // String!
      password: string; // String!
      pseudo: string; // String!
    }
    updateOneArticle: { // args
      content: string; // String!
      id: number; // Int!
      isPublished: boolean; // Boolean!
      label: string; // String!
    }
    updateOneArticleComment: { // args
      commentId: number; // Int!
      content: string; // String!
      note?: number | null; // Int
    }
    updateOneCategory: { // args
      label: string; // String!
    }
    updateOneWriterComment: { // args
      commentId: number; // Int!
      content: string; // String!
      note?: number | null; // Int
      writerIdBeingCommented: number; // Int!
      writerIdHasCommented: number; // Int!
    }
    updateWriter: { // args
      avatar: string; // String!
      blogLabel: string; // String!
      categoryId: number; // Int!
      description: string; // String!
      pseudo: string; // String!
      writerId: number; // Int!
    }
    validateOneComment: { // args
      commentId: number; // Int!
    }
  }
  Query: {
    getOneArticle: { // args
      id: number; // Int!
    }
    getOneCategory: { // args
      id: number; // Int!
    }
    getOneComment: { // args
      commentId: number; // Int!
    }
    getOneImage: { // args
      id: number; // Int!
    }
    getOneWriter: { // args
      writerId: number; // Int!
    }
    getOneWritterComment: { // args
      commentId: number; // Int!
    }
  }
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