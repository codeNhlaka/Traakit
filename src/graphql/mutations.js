/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserImage = /* GraphQL */ `
  mutation CreateUserImage(
    $input: CreateUserImageInput!
    $condition: ModelUserImageConditionInput
  ) {
    createUserImage(input: $input, condition: $condition) {
      id
      key
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUserImage = /* GraphQL */ `
  mutation UpdateUserImage(
    $input: UpdateUserImageInput!
    $condition: ModelUserImageConditionInput
  ) {
    updateUserImage(input: $input, condition: $condition) {
      id
      key
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUserImage = /* GraphQL */ `
  mutation DeleteUserImage(
    $input: DeleteUserImageInput!
    $condition: ModelUserImageConditionInput
  ) {
    deleteUserImage(input: $input, condition: $condition) {
      id
      key
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument(
    $input: UpdateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    updateDocument(input: $input, condition: $condition) {
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
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument(
    $input: DeleteDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    deleteDocument(input: $input, condition: $condition) {
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
export const createApplication = /* GraphQL */ `
  mutation CreateApplication(
    $input: CreateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    createApplication(input: $input, condition: $condition) {
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
export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication(
    $input: UpdateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    updateApplication(input: $input, condition: $condition) {
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
export const deleteApplication = /* GraphQL */ `
  mutation DeleteApplication(
    $input: DeleteApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    deleteApplication(input: $input, condition: $condition) {
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
export const createApplicationChartRecord = /* GraphQL */ `
  mutation CreateApplicationChartRecord(
    $input: CreateApplicationChartRecordInput!
    $condition: ModelApplicationChartRecordConditionInput
  ) {
    createApplicationChartRecord(input: $input, condition: $condition) {
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
export const updateApplicationChartRecord = /* GraphQL */ `
  mutation UpdateApplicationChartRecord(
    $input: UpdateApplicationChartRecordInput!
    $condition: ModelApplicationChartRecordConditionInput
  ) {
    updateApplicationChartRecord(input: $input, condition: $condition) {
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
export const deleteApplicationChartRecord = /* GraphQL */ `
  mutation DeleteApplicationChartRecord(
    $input: DeleteApplicationChartRecordInput!
    $condition: ModelApplicationChartRecordConditionInput
  ) {
    deleteApplicationChartRecord(input: $input, condition: $condition) {
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
