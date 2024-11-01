import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineElectricalServices } from "react-icons/md";


function Services() {

    return (
        <>

            <div style={{ backgroundColor: "#CEEEF8", height: "91vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h1 style={{ fontSize: "70px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MdOutlineElectricalServices style={{ transform: 'scaleX(-1)', display: "flex", alignItems: "center", justifyContent: "center", fontSize: "90px", }} />
                    <p style={{ height: "90px", marginLeft: "-8px" }}>ERVICES</p>
                </h1>
            </div>
        </>
    )
}

export default Services;