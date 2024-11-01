import { MdCall } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";



function ContactUs() {
    return (
        <>

            <div style={{ backgroundColor: "#E9F9E5", height: "91vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h1 style={{ fontSize: "70px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PiPhoneCallFill style={{ rotate: "45deg" }} />
                    <p style={{ height: "83px", marginLeft: "-8px" }}>ONTACT US</p>

                </h1>
            </div>
        </>
    )
}

export default ContactUs;