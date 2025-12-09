# Users API Snapshots

## Overview

This page shows the snapshot test results for the Users API endpoints.

All dynamic values (UUIDs and timestamps) are normalized using placeholders:
- `<UUID:1>`, `<UUID:2>` - Normalized UUIDs
- `<DATETIME:1>`, `<DATETIME:2>` - Normalized timestamps

::: tip
These snapshots represent the expected API response structure. Any changes to these structures will cause snapshot tests to fail, ensuring API stability.
:::

## GET /users/:id - returns user by id

```json
{
  "avatarUrl": "https://example.com/findable.jpg",
  "createdAt": "<DATETIME:1>",
  "id": "<UUID:1>",
  "name": "Findable User",
}
```

## POST /users - creates a user with name and avatarUrl in development mode

```json
{
  "avatarUrl": "https://example.com/avatar.jpg",
  "createdAt": "<DATETIME:1>",
  "id": "<UUID:1>",
  "name": "Test User",
}
```

## POST /users - creates a user with only name

```json
{
  "avatarUrl": null,
  "createdAt": "<DATETIME:1>",
  "id": "<UUID:1>",
  "name": "Test User 2",
}
```

