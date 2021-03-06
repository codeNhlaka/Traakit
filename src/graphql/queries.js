/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      fullnames
      skill
      employmentStatus
      userImageKey {
        id
        key
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fullnames
        skill
        employmentStatus
        userImageKey {
          id
          key
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserImage = /* GraphQL */ `
  query GetUserImage($id: ID!) {
    getUserImage(id: $id) {
      id
      key
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserImages = /* GraphQL */ `
  query ListUserImages(
    $filter: ModelUserImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      key
      name
      type
      category
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        name
        type
        category
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
      id
      companyName
      role
      progress
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyName
        role
        progress
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getApplicationChartRecord = /* GraphQL */ `
  query GetApplicationChartRecord($id: ID!) {
    getApplicationChartRecord(id: $id) {
      id
      applicationId
      applicationDate
      day
      month
      year
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listApplicationChartRecords = /* GraphQL */ `
  query ListApplicationChartRecords(
    $filter: ModelApplicationChartRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplicationChartRecords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        applicationId
        applicationDate
        day
        month
        year
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
