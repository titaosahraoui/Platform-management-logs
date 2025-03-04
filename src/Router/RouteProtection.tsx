import { useAppSelector } from "../Redux/Store";

interface RouteGuardProps {
    isAdminRoute: boolean | undefined;
}

const RouteProtection = ({
    isAdminRoute,

}: RouteGuardProps) => {
    const { token } = useAppSelector((state) => state.auth);
    const hasRequiredRole = () => isAdminRoute !== undefined ? !!token === isAdminRoute : true;
    return hasRequiredRole();
};

export default RouteProtection;
