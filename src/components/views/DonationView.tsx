import DonationForm from "../../ui/Complex/DonationForm/DonationForm"

export const DonationView = ({ part, meta, }: any) => {

    return (

        <DonationForm
            title={part.config.heading}
            description={part.config.description}
            amounts={[part.config.amount1, part.config.amount2, part.config.amount3]}
            factBox={part.config.factBox}
            vippsNumber={part.config.vippsNumber}
            accountNumber={part.config.accountNumber}

        />

    )
}