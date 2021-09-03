/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
export const onCreateUserImage = /* GraphQL */ `
  subscription OnCreateUserImage($owner: String!) {
    onCreateUserImage(owner: $owner) {
      id
      key
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUserImage = /* GraphQL */ `
  subscription OnUpdateUserImage($owner: String!) {
    onUpdateUserImage(owner: $owner) {
      id
      key
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUserImage = /* GraphQL */ `
  subscription OnDeleteUserImage($owner: String!) {
    onDeleteUserImage(owner: $owner) {
      id
      key
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument($owner: String!) {
    onCreateDocument(owner: $owner) {
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
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument($owner: String!) {
    onUpdateDocument(owner: $owner) {
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
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument($owner: String!) {
    onDeleteDocument(owner: $owner) {
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
export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication($owner: String!) {
    onCreateApplication(owner: $owner) {
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
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication($owner: String!) {
    onUpdateApplication(owner: $owner) {
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
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication($owner: String!) {
    onDeleteApplication(owner: $owner) {
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
export const onCreateApplicationChartRecord = /* GraphQL */ `
  subscription OnCreateApplicationChartRecord($owner: String!) {
    onCreateApplicationChartRecord(owner: $owner) {
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
export const onUpdateApplicationChartRecord = /* GraphQL */ `
  subscription OnUpdateApplicationChartRecord($owner: String!) {
    onUpdateApplicationChartRecord(owner: $owner) {
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
export const onDeleteApplicationChartRecord = /* GraphQL */ `
  subscription OnDeleteApplicationChartRecord($owner: String!) {
    onDeleteApplicationChartRecord(owner: $owner) {
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
