import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

export function MainLayout() {
    return (
        <div>
            <div style={{ paddingBottom: '60px' }}>
                <Outlet
                />
            </div>

            <BottomNav />
        </div>
    )
}