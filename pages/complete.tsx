import Body from "@/pageModules/complete/components/Body/Body";
import PrivateRoute from "@/hoc/PrivateRoute";

const CompletePage = () => {
  return (
    <PrivateRoute>
      <Body/>
    </PrivateRoute>
  )
}

export default CompletePage;