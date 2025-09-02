export default async function BranchPage(context: any) {
    const { params: paramsPromise, searchParams: searchParamsPromise } = context;
    const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise]);
    const { district, branch } = params;
    return (
        <div>
            <h1>side for: {district}/{branch}</h1>
        </div>
    );
}