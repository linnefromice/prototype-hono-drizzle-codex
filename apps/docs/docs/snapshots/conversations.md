# Conversations API Snapshots

## Overview

This page shows the snapshot test results for the Conversations API endpoints.

All dynamic values (UUIDs and timestamps) are normalized using placeholders:
- `<UUID:1>`, `<UUID:2>` - Normalized UUIDs
- `<DATETIME:1>`, `<DATETIME:2>` - Normalized timestamps

::: tip
These snapshots represent the expected API response structure. Any changes to these structures will cause snapshot tests to fail, ensuring API stability.
:::

## POST /conversations - creates a direct conversation with 2 participants

```json
{
  "createdAt": "<DATETIME:1>",
  "id": "<UUID:1>",
  "participants": [
    {
      "conversationId": "<UUID:1>",
      "id": "<UUID:2>",
      "joinedAt": "<DATETIME:2>",
      "role": "member",
      "userId": "<UUID:3>",
    },
    {
      "conversationId": "<UUID:1>",
      "id": "<UUID:4>",
      "joinedAt": "<DATETIME:2>",
      "role": "member",
      "userId": "<UUID:5>",
    },
  ],
  "type": "direct",
}
```

## POST /conversations - creates a group conversation with name and 3+ participants

```json
{
  "createdAt": "<DATETIME:1>",
  "id": "<UUID:1>",
  "name": "Test Group",
  "participants": [
    {
      "conversationId": "<UUID:1>",
      "id": "<UUID:2>",
      "joinedAt": "<DATETIME:2>",
      "role": "member",
      "userId": "<UUID:3>",
    },
    {
      "conversationId": "<UUID:1>",
      "id": "<UUID:4>",
      "joinedAt": "<DATETIME:2>",
      "role": "member",
      "userId": "<UUID:5>",
    },
    {
      "conversationId": "<UUID:1>",
      "id": "<UUID:6>",
      "joinedAt": "<DATETIME:2>",
      "role": "member",
      "userId": "<UUID:7>",
    },
  ],
  "type": "group",
}
```

## POST /conversations/:id/messages - sends a text message to a conversation

```json
{
  "conversationId": "<UUID:2>",
  "createdAt": "<DATETIME:1>",
  "id": "<UUID:1>",
  "senderUserId": "<UUID:3>",
  "text": "Hello, world!",
  "type": "text",
}
```

