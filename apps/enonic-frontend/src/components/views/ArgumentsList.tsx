import { ArgumentCard } from 'ui-lib'
import MoneyArrivesComponent from '../../ui/Complex/MoneyArrives/MoneyArrives';
import { getUrl } from "@enonic/nextjs-adapter";

export const ArgumentsList = ({ items, meta }: { items: any, meta: any }) => {
    if (!items || items.length === 0) return null;

    return <div>
        {items?.map((item: any) => <MoneyArrivesComponent
            title={item.data.title}
            description={item.data.text}
            causeAmount={90}
            learnMoreText={item.data.linkText}
            learnMoreUrl={item.data.readMoreLink?.[0]?._path ? getUrl(item.data.readMoreLink?.[0]?._path, meta) : item.data.readMoreLink?.[0]?.pageUrl ? getUrl(item.data.readMoreLink?.[0]?.pageUrl, meta) : undefined}
            imageUrl={item.data.image?.imageUrl}

        />)}
    </div>
}

export default ArgumentsList;