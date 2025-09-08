# Sanity Scripts

This directory contains utility scripts for managing Sanity content.

## Local Groups Sync Script

The `syncLocalGroups.js` script fetches local group data from the Røde Kors API and syncs it with Sanity.

### What it does

1. Fetches all branches from `https://api-dev.redcross.no/nrx/v1/organizations`
2. Filters for branches with `branchType === "Lokalforening"`
3. Creates or updates Sanity documents for each local group
4. Preserves manually edited `branchName` fields while updating all other API data

### Setup

1. Install dependencies:
   ```bash
   cd apps/sanity-cms
   yarn install
   ```

2. Set up environment variables:
   ```bash
   # Create .env file or set environment variables
   SANITY_PROJECT_ID=your_project_id
   SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

### Usage

Run the sync script:
```bash
yarn sync-local-groups
```

### Data Structure

The script creates/updates documents with the following structure:

- **Read-only fields** (updated from API):
  - `branchId` - Unique branch identifier
  - `branchNumber` - Branch number
  - `organizationNumber` - Organization number
  - `branchType` - Always "Lokalforening"
  - `branchStatus` - Active status, creation date, termination status
  - `branchParent` - Parent district information
  - `branchLocation` - Municipality, county, region, postal address
  - `communicationChannels` - Phone, email, website
  - `branchContacts` - Contact persons with roles and member numbers
  - `branchActivities` - List of activities offered

- **Editable fields**:
  - `branchName` - Can be edited locally (defaults to API value)
  - `title` - Document title (defaults to branchName)
  - `language` - Document language (defaults to 'no')
  - `isPublished` - Publication status (defaults to branch active status)

### Behavior

- **New branches**: Creates new documents with all API data
- **Existing branches**: Updates all read-only fields, preserves manually edited `branchName`
- **Error handling**: Continues processing other branches if one fails
- **Logging**: Provides detailed console output of sync progress

### API Data Source

The script fetches data from the Røde Kors API endpoint:
- **URL**: `https://api-dev.redcross.no/nrx/v1/organizations`
- **Data**: Contains 390+ branches with detailed information
- **Filter**: Only processes branches with `branchType: "Lokalforening"`

### Example Output

```
Fetching organizations from API...
Fetched 390 branches from API
Found 250 local groups (Lokalforening)
Found 45 existing local groups in Sanity
Creating new local group: Modum Røde Kors (L098)
Updating existing local group: Hammerfest Røde Kors (L333)
...

Sync completed!
Created: 205
Updated: 45
Errors: 0
Total processed: 250
```
