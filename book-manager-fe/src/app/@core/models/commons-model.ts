// These interfaces are used in other entities

// Activities
// This interface is used by almost each entity to indicate the base activities
export interface Activities {
  dateInsert: Date,
  dateModify: Date,
  lastUserModify: string
}
