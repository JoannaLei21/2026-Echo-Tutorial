"user client"

import { useOrganization } from "@clerk/nextjs"
import { AuthLayout } from "../layout/auth-layout"
import { OrgSelectionView } from "../views/org-selection-view"

const OrganizationGuard = ({ children }: { children: React.ReactNode }) => {
  const { organization } = useOrganization()
  
  if(!organization){
    return (
      <div>
        <OrgSelectionView />
      </div>
    )
  }
  
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}

export default OrganizationGuard