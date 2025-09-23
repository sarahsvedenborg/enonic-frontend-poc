// Mapping between API activity types and Sanity activity types
export const mapApiActivityTypeToSanity = (apiActivityType: string): string => {
    const mapping: Record<string, string> = {
        // Direct mappings
        'Vitnestøtte': 'Vitnestøtte',
        'Besøkstjeneste': 'Besøkstjeneste',
        'Møteplasser': 'Møteplasser',
        'Administrative oppgaver': 'Administrative oppgaver',
        'Språkgruppe': 'Språkgruppe',
        'Leksehjelp': 'Leksehjelp',
        'Hjelpekorps': 'Hjelpekorps',
        'Besøksvenn med hund': 'Besøksvenn med hund',
        'Øvrige aktiviteter - Røde Kors Ungdom': 'Øvrige aktiviteter - Røde Kors Ungdom',
        'Flyktningguide': 'flyktningguide',


        // Fallback for unknown types
        'default': 'annet'
    }

    return mapping[apiActivityType] || mapping['default']
}

// Get activity type display name
export const getActivityTypeDisplayName = (activityType: string): string => {
    const displayNames: Record<string, string> = {
        'Vitnestøtte': 'Vitnestøtte',
        'Besøkstjeneste': 'Besøkstjeneste',
        'Møteplasser': 'Møteplasser',
        'Administrative oppgaver': 'Administrative oppgaver',
        'Språkgruppe': 'Språkgruppe',
        'Leksehjelp': 'Leksehjelp',
        'Hjelpekorps': 'Hjelpekorps',
        'Besøksvenn med hund': 'Besøksvenn med hund',
        'Øvrige aktiviteter - Røde Kors Ungdom': 'Øvrige aktiviteter - Røde Kors Ungdom',
        'Flyktningguide': 'flyktningguide',
    }

    return displayNames[activityType] || 'Annet'
}
