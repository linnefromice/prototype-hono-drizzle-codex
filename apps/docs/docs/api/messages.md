# Messages API

The Messages API provides endpoints for managing messages, reactions, and bookmarks within conversations.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/conversations/:id/messages` | List messages in a conversation |
| POST | `/conversations/:id/messages` | Send a message |
| POST | `/messages/:id/reactions` | Add reaction to message |
| DELETE | `/messages/:id/reactions/:emoji` | Remove reaction from message |
| POST | `/messages/:id/bookmarks` | Bookmark a message |
| DELETE | `/messages/:id/bookmarks` | Remove bookmark from message |

## GET /conversations/:id/messages

List messages in a conversation with optional pagination.

**Parameters:**
- `id` (path, required): Conversation ID in UUID format

**Query Parameters:**
- `userId` (required): User ID requesting messages (for authorization)
- `limit` (optional): Number of messages to return (1-100, default varies)
- `before` (optional): ISO 8601 datetime to fetch messages before this timestamp

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "conversationId": "660e8400-e29b-41d4-a716-446655440000",
    "senderUserId": "770e8400-e29b-41d4-a716-446655440000",
    "type": "text",
    "text": "Hello, world!",
    "replyToMessageId": null,
    "systemEvent": null,
    "createdAt": "2024-12-10T00:00:00.000Z"
  }
]
```

## POST /conversations/:id/messages

Send a new message to a conversation.

**Parameters:**
- `id` (path, required): Conversation ID in UUID format

**Request Body (Text Message):**
```json
{
  "senderUserId": "550e8400-e29b-41d4-a716-446655440000",
  "text": "Hello, world!",
  "replyToMessageId": null  // optional, for threaded replies
}
```

**Request Body (System Message):**
```json
{
  "senderUserId": null,
  "text": null,
  "systemEvent": "join"  // or "leave"
}
```

**Response (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "conversationId": "770e8400-e29b-41d4-a716-446655440000",
  "senderUserId": "550e8400-e29b-41d4-a716-446655440000",
  "type": "text",
  "text": "Hello, world!",
  "replyToMessageId": null,
  "systemEvent": null,
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

## POST /messages/:id/reactions

Add an emoji reaction to a message.

**Parameters:**
- `id` (path, required): Message ID in UUID format

**Request Body:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "emoji": "👍"
}
```

**Response (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "messageId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "770e8400-e29b-41d4-a716-446655440000",
  "emoji": "👍",
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

## DELETE /messages/:id/reactions/:emoji

Remove an emoji reaction from a message.

**Parameters:**
- `id` (path, required): Message ID in UUID format
- `emoji` (path, required): Emoji to remove (URL encoded)

**Query Parameters:**
- `userId` (required): User ID removing the reaction

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "messageId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "770e8400-e29b-41d4-a716-446655440000",
  "emoji": "👍",
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

## POST /messages/:id/bookmarks

Bookmark a message for later reference.

**Parameters:**
- `id` (path, required): Message ID in UUID format

**Request Body:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (201 Created):**
```json
{
  "status": "bookmarked",
  "bookmark": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "messageId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "770e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-12-10T00:00:00.000Z"
  }
}
```

## DELETE /messages/:id/bookmarks

Remove a bookmark from a message.

**Parameters:**
- `id` (path, required): Message ID in UUID format

**Query Parameters:**
- `userId` (required): User ID removing the bookmark

**Response (200 OK):**
```json
{
  "status": "unbookmarked"
}
```

## Schema Details

### Message

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string (uuid) | Unique message identifier | Yes |
| conversationId | string (uuid) | ID of the conversation | Yes |
| senderUserId | string (uuid) \| null | ID of sender (null for system messages) | No |
| type | string | Message type: `text` or `system` | Yes |
| text | string \| null | Message text content (null for system messages) | No |
| replyToMessageId | string (uuid) \| null | ID of message being replied to | No |
| systemEvent | string \| null | System event type: `join` or `leave` (null for text messages) | No |
| createdAt | string (date-time) | Message creation timestamp | Yes |

### SendMessageRequest

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| senderUserId | string (uuid) \| null | ID of sender (null for system messages) | Yes |
| text | string \| null | Message text content | No |
| replyToMessageId | string (uuid) \| null | ID of message being replied to | No |
| systemEvent | string \| null | System event type: `join` or `leave` | No |

::: info Message Types
- **Text messages**: Require `senderUserId` and `text`
- **System messages**: Set `senderUserId` to null and specify `systemEvent`
:::

### Reaction

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string (uuid) | Unique reaction identifier | Yes |
| messageId | string (uuid) | ID of the message | Yes |
| userId | string (uuid) | ID of user who reacted | Yes |
| emoji | string | Emoji character | Yes |
| createdAt | string (date-time) | Reaction creation timestamp | Yes |

### ReactionRequest

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| userId | string (uuid) | ID of user adding reaction | Yes |
| emoji | string | Emoji character | Yes |

### Bookmark

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string (uuid) | Unique bookmark identifier | Yes |
| messageId | string (uuid) | ID of bookmarked message | Yes |
| userId | string (uuid) | ID of user who bookmarked | Yes |
| createdAt | string (date-time) | Bookmark creation timestamp | Yes |

### BookmarkRequest

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| userId | string (uuid) | ID of user adding bookmark | Yes |

### BookmarkResponse

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| status | string | Status: `bookmarked` | Yes |
| bookmark | Bookmark | The created bookmark | Yes |

### UnbookmarkResponse

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| status | string | Status: `unbookmarked` | Yes |

## Message Pagination

The `/conversations/:id/messages` endpoint supports cursor-based pagination using the `before` parameter:

```javascript
// Fetch latest 20 messages
GET /conversations/{id}/messages?userId={userId}&limit=20

// Fetch next 20 messages before oldest received
GET /conversations/{id}/messages?userId={userId}&limit=20&before=2024-12-09T00:00:00.000Z
```

Messages are returned in reverse chronological order (newest first).

## See Also

- [Full OpenAPI Reference](/api-reference.html) - Complete interactive API documentation
- [Messages API Snapshots](/snapshots/messages) - Example responses from snapshot tests
- [Conversations API](/api/conversations) - Related conversation endpoints
- [Users API](/api/users) - User bookmarks endpoint
- [API Overview](/api/) - Main API documentation index
