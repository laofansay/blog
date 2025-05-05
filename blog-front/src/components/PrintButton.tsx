"use client";

import { Button } from "@nextui-org/react";

export default function PrintButton() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Button
            onClick={handlePrint}
            color="primary"
            variant="shadow"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform print:hidden"
        >
            打印简历
        </Button>
    );
}
