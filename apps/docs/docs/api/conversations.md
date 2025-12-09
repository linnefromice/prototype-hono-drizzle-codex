# Conversations API

The Conversations API provides endpoints for managing conversations and participants.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/conversations` | List conversations for a user |
| POST | `/conversations` | Create a new conversation |
| GET | `/conversations/:id` | Get conversation details |
| POST | `/conversations/:id/participants` | Add participant to conversation |
| DELETE | `/conversations/:id/participants/:userId` | Remove participant from conversation |
| POST | `/conversations/:id/read` | Update last read message |
| GET | `/conversations/:id/unread-count` | Get unread message count |

## GET /conversations

List all conversations for a specific user.

**Query Parameters:**
- `userId` (required): User ID in UUID format

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "direct",
    "name": null,
    "createdAt": "2024-12-10T00:00:00.000Z",
    "participants": [
      {
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "conversationId": "550e8400-e29b-41d4-a716-446655440000",
        "userId": "770e8400-e29b-41d4-a716-446655440000",
        "role": "member",
        "joinedAt": "2024-12-10T00:00:00.000Z",
        "leftAt": null
      }
    ]
  }
]
```

## POST /conversations

Create a new conversation with specified participants.

**Request Body:**
```json
{
  "type": "direct",  // or "group"
  "name": "Team Discussion",  // optional, recommended for group chats
  "participantIds": [
    "550e8400-e29b-41d4-a716-446655440000",
    "660e8400-e29b-41d4-a716-446655440000"
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440000",
  "type": "group",
  "name": "Team Discussion",
  "createdAt": "2024-12-10T00:00:00.000Z",
  "participants": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440000",
      "conversationId": "770e8400-e29b-41d4-a716-446655440000",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "role": "member",
      "joinedAt": "2024-12-10T00:00:00.000Z",
      "leftAt": null
    }
  ]
}
```

## GET /conversations/:id

Get detailed information about a specific conversation.

**Parameters:**
- `id` (path, required): Conversation ID in UUID format

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "direct",
  "name": null,
  "createdAt": "2024-12-10T00:00:00.000Z",
  "participants": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "conversationId": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "770e8400-e29b-41d4-a716-446655440000",
      "role": "member",
      "joinedAt": "2024-12-10T00:00:00.000Z",
      "leftAt": null
    }
  ]
}
```

## POST /conversations/:id/participants

Add a new participant to an existing conversation.

**Parameters:**
- `id` (path, required): Conversation ID in UUID format

**Request Body:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "role": "member"  // optional, defaults to "member", can be "admin"
}
```

**Response (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "conversationId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "770e8400-e29b-41d4-a716-446655440000",
  "role": "member",
  "joinedAt": "2024-12-10T00:00:00.000Z",
  "leftAt": null
}
```

## DELETE /conversations/:id/participants/:userId

Remove a participant from a conversation (marks as left).

**Parameters:**
- `id` (path, required): Conversation ID in UUID format
- `userId` (path, required): User ID in UUID format

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "conversationId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "770e8400-e29b-41d4-a716-446655440000",
  "role": "member",
  "joinedAt": "2024-12-10T00:00:00.000Z",
  "leftAt": "2024-12-10T01:00:00.000Z"
}
```

## POST /conversations/:id/read

Update the last read message position for a user in a conversation.

**Parameters:**
- `id` (path, required): Conversation ID in UUID format

**Request Body:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "lastReadMessageId": "660e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "read": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "conversationId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440000",
    "lastReadMessageId": "660e8400-e29b-41d4-a716-446655440000",
    "updatedAt": "2024-12-10T00:00:00.000Z"
  }
}
```

## GET /conversations/:id/unread-count

Get the number of unread messages for a user in a conversation.

**Parameters:**
- `id` (path, required): Conversation ID in UUID format

**Query Parameters:**
- `userId` (required): User ID in UUID format

**Response (200 OK):**
```json
{
  "unreadCount": 5
}
```

## Schema Details

### Conversation

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string (uuid) | Unique conversation identifier | Yes |
| type | string | Conversation type: `direct` or `group` | Yes |
| name | string \| null | Conversation name (optional for direct, recommended for group) | No |
| createdAt | string (date-time) | Conversation creation timestamp | Yes |

### ConversationDetail

Extends `Conversation` with:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| participants | Participant[] | Array of conversation participants | Yes |

### Participant

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string (uuid) | Unique participant record identifier | Yes |
| conversationId | string (uuid) | ID of the conversation | Yes |
| userId | string (uuid) | ID of the user | Yes |
| role | string | Participant role: `member` or `admin` | Yes |
| joinedAt | string (date-time) | When participant joined | Yes |
| leftAt | string (date-time) \| null | When participant left (null if active) | No |

### CreateConversationRequest

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| type | string | Conversation type: `direct` or `group` | Yes |
| name | string \| null | Conversation name | No |
| participantIds | string[] (uuid) | Array of user IDs to add as participants (min: 1) | Yes |

### AddParticipantRequest

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| userId | string (uuid) | User ID to add | Yes |
| role | string \| null | Participant role: `member` or `admin` (defaults to `member`) | No |

### ConversationRead

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string (uuid) | Unique read record identifier | Yes |
| conversationId | string (uuid) | ID of the conversation | Yes |
| userId | string (uuid) | ID of the user | Yes |
| lastReadMessageId | string (uuid) \| null | ID of last read message | No |
| updatedAt | string (date-time) | Last update timestamp | Yes |

## See Also

- [Full OpenAPI Reference](/api-reference.html) - Complete interactive API documentation
- [Conversations API Snapshots](/snapshots/conversations) - Example responses from snapshot tests
- [Messages API](/api/messages) - Related message endpoints
- [API Overview](/api/) - Main API documentation index
