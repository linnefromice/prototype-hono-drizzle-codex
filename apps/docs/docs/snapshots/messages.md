# Messages API Snapshots

## Overview

This page shows the snapshot test results for the Messages API endpoints.

All dynamic values (UUIDs and timestamps) are normalized using placeholders:
- `<UUID:1>`, `<UUID:2>` - Normalized UUIDs
- `<DATETIME:1>`, `<DATETIME:2>` - Normalized timestamps

::: tip
These snapshots represent the expected API response structure. Any changes to these structures will cause snapshot tests to fail, ensuring API stability.
:::

## POST /messages/:id/bookmarks - bookmarks a message

```json
{
  "bookmark": {
    "createdAt": "<DATETIME:1>",
    "id": "<UUID:1>",
    "messageId": "<UUID:2>",
    "userId": "<UUID:3>",
  },
  "status": "bookmarked",
}
```

## POST /messages/:id/reactions - adds a reaction to a message

```json
{
  "createdAt": "<DATETIME:1>",
  "emoji": "👍",
  "id": "<UUID:1>",
  "messageId": "<UUID:2>",
  "userId": "<UUID:3>",
}
```

