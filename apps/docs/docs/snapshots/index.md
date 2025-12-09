# Snapshot Testing Overview

Welcome to the API snapshot testing documentation. This section provides visual representations of the API response structures captured during automated testing.

## What are Snapshot Tests?

Snapshot tests capture the exact structure and format of API responses at a point in time. These snapshots serve as:

- **Documentation**: Visual reference for API response formats
- **Regression Prevention**: Any changes to response structure will cause tests to fail
- **API Stability**: Ensures backwards compatibility is maintained
- **Type Safety**: Validates that responses match expected schemas

## Normalized Test Data

To ensure stable snapshot comparisons across test runs, dynamic values are normalized using placeholders:

| Placeholder | Description | Example Original Value |
|------------|-------------|----------------------|
| `<UUID:1>`, `<UUID:2>`, etc. | Normalized UUIDs | `550e8400-e29b-41d4-a716-446655440000` |
| `<DATETIME:1>`, `<DATETIME:2>`, etc. | Normalized timestamps | `2024-12-10T00:00:00.000Z` |

This normalization allows snapshots to remain consistent while testing dynamic data generation.

::: info Why Normalization?
Without normalization, every test run would generate different UUIDs and timestamps, making snapshot comparison impossible. The normalized placeholders maintain deterministic snapshots while still validating the complete response structure.
:::

## Available Snapshots

### [Users API Snapshots](/snapshots/users)
Snapshots for user management endpoints including:
- User creation and retrieval
- User listing
- User profile data structures

[View Users Snapshots →](/snapshots/users)

### [Conversations API Snapshots](/snapshots/conversations)
Snapshots for conversation management endpoints including:
- Conversation creation
- Participant management
- Conversation details with participants

[View Conversations Snapshots →](/snapshots/conversations)

### [Messages API Snapshots](/snapshots/messages)
Snapshots for messaging endpoints including:
- Message sending
- Message retrieval
- Message listing with pagination

[View Messages Snapshots →](/snapshots/messages)

## How to Read Snapshots

Each snapshot page shows:

1. **Test Name**: Formatted as `HTTP_METHOD /endpoint/path - Description`
2. **Response Structure**: Complete JSON response with normalized values
3. **Field Types**: UUIDs, timestamps, strings, booleans, etc.

Example snapshot format:

```json
{
  "id": "<UUID:1>",
  "name": "Example User",
  "createdAt": "<DATETIME:1>",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

## Snapshot Generation

Snapshots are automatically generated from Vitest test files located in:
```
apps/backend/src/routes/__snapshots__/
```

The build process includes:
1. Running all API tests with Vitest
2. Capturing response snapshots
3. Normalizing dynamic values
4. Converting to Markdown documentation
5. Publishing to this documentation site

## Updating Snapshots

When API response structures intentionally change, snapshots must be updated:

```bash
# Run tests and update snapshots
npm run test --workspace backend -- -u

# Regenerate documentation
npm run build --workspace docs
```

::: warning Breaking Changes
If snapshot tests fail, it indicates a **breaking change** to the API response structure. Review the changes carefully before updating snapshots, as this may affect API consumers.
:::

## Testing Framework

- **Test Runner**: [Vitest](https://vitest.dev/)
- **Snapshot Format**: Vitest Snapshot v1
- **Normalization**: Custom test utilities for UUID and timestamp normalization
- **Documentation Generation**: Custom TypeScript script (`scripts/generate-snapshot-docs.ts`)

## Benefits of Snapshot Testing

✅ **Visual Documentation**: See exactly what API responses look like
✅ **Automated Validation**: Catch unintended changes automatically
✅ **Type Safety**: Ensures responses match TypeScript types
✅ **Regression Prevention**: Prevents accidental breaking changes
✅ **Developer Experience**: Easy to review changes in PR diffs

## Next Steps

Explore the snapshot documentation for each API endpoint:

- [Users API Snapshots](/snapshots/users)
- [Conversations API Snapshots](/snapshots/conversations)
- [Messages API Snapshots](/snapshots/messages)

For interactive API documentation with schemas and examples, see the [API Reference](/api/).
