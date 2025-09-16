// Mapping between API activity types and Sanity activity types
export const mapApiActivityTypeToSanity = (apiActivityType: string): string => {
    const mapping: Record<string, string> = {
        // Direct mappings
        'Vitnestøtte': 'vitnestotte',
        'Besøkstjeneste': 'besokstjeneste',
        'Møteplass': 'motepass',
        'Førstehjelp': 'forstehjelp',
        'Katastrofehjelp': 'katastrofehjelp',
        'Sosialt arbeid': 'sosialt-arbeid',
        'Ungdomsarbeid': 'ungdomsarbeid',
        'Eldreomsorg': 'eldreomsorg',
        'Flyktninghjelp': 'flyktninghjelp',
        'Blodgivning': 'blodgivning',

        // Fallback for unknown types
        'default': 'annet'
    }

    return mapping[apiActivityType] || mapping['default']
}

// Get activity type display name
export const getActivityTypeDisplayName = (activityType: string): string => {
    const displayNames: Record<string, string> = {
        'vitnestotte': 'Vitnestøtte',
        'besokstjeneste': 'Besøkstjeneste',
        'motepass': 'Møteplass',
        'forstehjelp': 'Førstehjelp',
        'katastrofehjelp': 'Katastrofehjelp',
        'sosialt-arbeid': 'Sosialt arbeid',
        'ungdomsarbeid': 'Ungdomsarbeid',
        'eldreomsorg': 'Eldreomsorg',
        'flyktninghjelp': 'Flyktninghjelp',
        'blodgivning': 'Blodgivning',
        'annet': 'Annet'
    }

    return displayNames[activityType] || 'Annet'
}
