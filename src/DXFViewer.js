import React, { useEffect } from "react";
import DXFParser from "dxf-parser";

const DXFViewer = ({ dxfFilePath }) => {
    useEffect(() => {
        let canvas = document.getElementById("dxf-canvas");

        if (!canvas) {
            console.error("Canvas not found in the DOM.");
            return;
        }

        let ctx = canvas.getContext("2d");
        // ctx.beginPath();
        // ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
        // ctx.strokeStyle = "blue";
        // ctx.lineWidth = 2;
        // ctx.stroke();
        // console.log("vvvvvvvvvvv", canvas.width / 2, canvas.height / 2);

        fetch(dxfFilePath)
            .then((response) => response.text())
            .then((data) => {
                if (data) {
                    const parser = new DXFParser();
                    const dxfData = parser.parse(data);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    console.log("DXF Data:", dxfData);

                    dxfData.entities.forEach((entity, idx) => {
                        if (entity.type === "LINE") {
                            const scaleX = 0.2;
                            const scaleY = 0.2;
                            const start = entity.vertices[0];
                            const end = entity.vertices[1];
                            ctx.beginPath();
                            ctx.moveTo(start.x * scaleX, start.y * scaleY);
                            ctx.lineTo(end.x * scaleX, end.y * scaleY);
                            ctx.strokeStyle = "green";
                            ctx.stroke();
                        } else if (entity.type === "ARC") {
                            const scaleX = 0.1; // Adjust this scaling factor as needed
                            const scaleY = 0.1; // Adjust this scaling factor as needed
                            const center = entity.center;
                            const radius = entity.radius;
                            // console.log(center.x * scaleX, "vvvvvvvvvvv", Math.abs(center.y) * scaleY);
                            ctx.beginPath();
                            ctx.arc(center.x * scaleX, (Math.abs(center.y) * scaleY) / 4, radius, 0, 2 * Math.PI);
                            ctx.strokeStyle = "blue";
                            ctx.stroke();
                        }
                    });
                } else {
                    console.error("No valid entities found in DXF data.");
                }
            });
    }, [dxfFilePath]);

    return (
        <canvas
            style={{ backgroundColor: "#f4f0ee" }}
            id="dxf-canvas"
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
};

export default DXFViewer;
