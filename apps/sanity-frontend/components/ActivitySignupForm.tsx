'use client'
import React, { useState } from 'react'
import { Heading, Paragraph } from '@digdir/designsystemet-react'
import { Section } from 'ui-lib'
import { Buttons as Button, Input } from 'rk-designsystem'
import { FiChevronDown, FiUsers } from 'react-icons/fi'
import './ActivitySignupForm.css'

interface ActivitySignupFormProps {
    title?: string
    description?: string
    branchName?: string
    activityType?: string
    onSubmit?: (data: { localGroup: string; activityType: string }) => void
}

export default function ActivitySignupForm({
    title = "Bli med i aktiviteten",
    description = "Fyll ut skjemaet nedenfor for å melde din interesse for å delta i denne aktiviteten.",
    branchName,
    activityType,
    onSubmit,
}: ActivitySignupFormProps) {
    const [localGroup, setLocalGroup] = useState(branchName || '')
    const [selectedActivityType, setSelectedActivityType] = useState(activityType || '')
    const [showActivityDropdown, setShowActivityDropdown] = useState(false)

    const activityTypes = [
        'Vitnestøtte',
        'Besøkstjeneste',
        'Møteplasser',
        'Administrative oppgaver',
        'Språkgruppe',
        'Leksehjelp',
        'Hjelpekorps',
        'Besøksvenn med hund',
        'Øvrige aktiviteter - Røde Kors Ungdom',
        'Flyktningguide',
    ]

    const selectedActivityLabel = selectedActivityType || 'Velg aktivitetstype'

    const handleSubmit = () => {
        console.log('Handle Activity signup')
        if (localGroup && selectedActivityType) {
            onSubmit?.({ localGroup, activityType: selectedActivityType })
        }
    }

    return (
        <Section width="sm">
            <div className="activity-signup-form">
                <div className="form-container">
                    {/* Header Section */}
                    <div className="header">
                        <h1 className="title">{title}</h1>
                        <p className="description">{description}</p>
                    </div>

                    {/* Local Group Input */}
                    <div className="section">
                        <label className="label">Lokalforening</label>
                        <Input
                            aria-labelledby="local-group-label"
                            data-size="md"
                            id="local-group"
                            name="local-group"
                            placeholder="Skriv inn lokalforening..."
                            type="text"
                            value={localGroup}
                            onChange={(e) => setLocalGroup(e.target.value)}
                        />
                    </div>

                    {/* Activity Type Selection */}
                    <div className="section">
                        <label className="label">Aktivitetstype</label>
                        <div className="dropdown-container">
                            <button
                                className="dropdown-button"
                                onClick={() => setShowActivityDropdown(!showActivityDropdown)}
                                type="button"
                            >
                                <span className="dropdown-text">{selectedActivityLabel}</span>
                                <FiChevronDown className={`dropdown-icon ${showActivityDropdown ? 'rotated' : ''}`} />
                            </button>

                            {showActivityDropdown && (
                                <div className="dropdown-menu">
                                    {activityTypes.map((type) => (
                                        <button
                                            key={type}
                                            className={`dropdown-item ${selectedActivityType === type ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelectedActivityType(type)
                                                setShowActivityDropdown(false)
                                            }}
                                            type="button"
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Impact Statement */}

                    <Section width="sm">
                        <Paragraph data-size="sm">
                            Det er ikke alltid at vi kan imøtekomme aktivitetsønsket ditt, det kan være at behovet har endret seg eller at vi blir eninge om at du passer bedre i en annen aktivitet.</Paragraph>
                    </Section>


                    {/* Submit Button */}

                    <Button
                        variant="primary"
                        size="large"
                        onClick={handleSubmit}
                        className="submit-button"
                        disabled={!localGroup || !selectedActivityType}
                    >
                        Registrer deg med VIPPS
                    </Button>

                </div>
            </div>
        </Section >
    )
}
