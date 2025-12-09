# Users API

The Users API provides endpoints for managing user accounts and profiles.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users (development only) |
| POST | `/users` | Create a new user (development only) |
| GET | `/users/:userId` | Get user by ID |
| GET | `/users/:userId/bookmarks` | List user's bookmarks |

## GET /users

List all users in the system.

::: warning Development Only
This endpoint is only available in development mode and will return 403 Forbidden in production.
:::

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "createdAt": "2024-12-10T00:00:00.000Z"
  }
]
```

## POST /users

Create a new user account.

::: warning Development Only
This endpoint is only available in development mode and will return 403 Forbidden in production.
:::

**Request Body:**
```json
{
  "name": "John Doe",
  "avatarUrl": "https://example.com/avatar.jpg"  // optional
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "avatarUrl": "https://example.com/avatar.jpg",
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

## GET /users/:userId

Get detailed information about a specific user.

**Parameters:**
- `userId` (path, required): User ID in UUID format

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "avatarUrl": "https://example.com/avatar.jpg",
  "createdAt": "2024-12-10T00:00:00.000Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

## GET /users/:userId/bookmarks

List all bookmarked messages for a specific user.

**Parameters:**
- `userId` (path, required): User ID in UUID format

**Response (200 OK):**
```json
[
  {
    "messageId": "550e8400-e29b-41d4-a716-446655440000",
    "conversationId": "660e8400-e29b-41d4-a716-446655440000",
    "text": "Important message",
    "createdAt": "2024-12-10T00:00:00.000Z",
    "messageCreatedAt": "2024-12-09T00:00:00.000Z"
  }
]
```

## Schema Details

### User

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string (uuid) | Unique user identifier | Yes |
| name | string | User's display name | Yes |
| avatarUrl | string \| null | URL to user's avatar image | No |
| createdAt | string (date-time) | Account creation timestamp | Yes |

### CreateUserRequest

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| name | string | User's display name (min length: 1) | Yes |
| avatarUrl | string \| null | URL to user's avatar image | No |

### BookmarkListItem

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| messageId | string (uuid) | ID of bookmarked message | Yes |
| conversationId | string (uuid) | ID of conversation containing message | Yes |
| text | string \| null | Message text content | No |
| createdAt | string (date-time) | Bookmark creation timestamp | Yes |
| messageCreatedAt | string (date-time) | Message creation timestamp | Yes |

## See Also

- [Full OpenAPI Reference](/api-reference.html) - Complete interactive API documentation
- [Users API Snapshots](/snapshots/users) - Example responses from snapshot tests
- [API Overview](/api/) - Main API documentation index
