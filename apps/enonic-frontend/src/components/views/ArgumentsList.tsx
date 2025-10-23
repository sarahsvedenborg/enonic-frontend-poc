import { ArgumentCard } from 'ui-lib'
import MoneyArrivesComponent from '../../ui/Complex/MoneyArrives/MoneyArrives';
import { getUrl } from "@enonic/nextjs-adapter";

export const ArgumentsList = ({ items, meta }: { items: any, meta: any }) => {
    console.log("items", items[0].data)

    return <div>
        {items?.map((item: any) => <MoneyArrivesComponent
            title={item.data.title}
            description={item.data.text}
            causeAmount={90}
            learnMoreText={item.data.linkText}
            learnMoreUrl={getUrl(item.data.readMoreLink?.[0]._path, meta)}
            imageUrl={item.data.image?.imageUrl}

        />)}
    </div>
}

export default ArgumentsList;