import { Heading } from 'ui-lib';

export default async function BranchPage(context: any) {
    const { params: paramsPromise, searchParams: searchParamsPromise } = context;
    const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
    const { district, branch } = params;
    return (
        <div>
            <Heading level={1}>side for: {district}/{branch}</Heading>
        </div>
    );
}