import AdminUsersMonitor from "./AdminUsersMonitor"
import ModuleTypeMonitor from "./ModuleTypeMonitor"
import NationsMonitor from "./NationsMonitor"
import StatusMonitor from "./StatusMonitor"
import TankStatusMonitor from "./TankStatusMonitor"
import TankTypesMonitor from "./TankTypesMonitor"


const CombinedMonitors = () => {

    return (
        <div>
            <NationsMonitor/>
            <TankTypesMonitor/>
            <TankStatusMonitor/>
            <ModuleTypeMonitor/>
            <AdminUsersMonitor/>
        </div>
    )
}

export default CombinedMonitors