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
