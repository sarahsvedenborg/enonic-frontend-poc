import { StructureBuilder } from 'sanity/desk'
import { FiFileText, FiGift, FiGlobe, FiMapPin, FiSmile, FiTarget, FiCalendar, FiMenu } from 'react-icons/fi'
import { nationalContributorContent } from './nationalContributorStructure'
import { allContentStructure } from './allContentStructure'
import { branchContentStructure } from './branchContentStructure'


export const deskStructure = (S: StructureBuilder, context: any) => {



    const getDeskstructureFromRole = (S, context) => {

        const roleName = context.currentUser?.roles[0]?.name || 'viewer'
        console.log(roleName)
        switch (roleName) {
            case "administrator":
                return allContentStructure(S)
            case "viewer":
                return allContentStructure(S)
            case "editor":
                return allContentStructure(S)
            case "national-contributor":
                return nationalContributorContent(S)
            case "editor-skedsmo":
                return branchContentStructure(S, { branchId: 'L023' })
            default:
                return allContentStructure(S)
        }
    }

    return (S.list()
        .title('Innhold')
        .items(getDeskstructureFromRole(S, context)))
}
