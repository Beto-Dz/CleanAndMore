import { useState } from "react";

export const ModalPrices = () => {
  const [showModal, setShowModal] = useState(false);


  const handleShowModal = () => {
    setShowModal(!showModal);
  }

  return (
    <>
      <button 
        onClick={handleShowModal}
        className="py-1 px-3 bg-primary rounded-full hover:scale-105 active:scale-95 drop-shadow-lg ring-white ring-1">
        Show prices!
      </button>

      {
        showModal &&
        (
            <div className="bg-[#0000008b] fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center">
                <section className="p-2 bg-white rounded-md grid gap-2 min-w-80 sm:min-w-96 md:w-[500px]">
                    <header>
                        <section className="w-full flex flex-col gap-3 items-center">
                            <h2 className="text-center font-bold text-2xl">Prices</h2>
                            <ol className="w-full">
                                <li><span className="font-semibold">$25.00</span><span className="text-slate-900"> for regular cleaning.</span></li>
                                <li><span className="font-semibold">$30.00</span><span className="text-slate-900"> for regular cleaning with liquids.</span></li>
                                <li><span className="font-semibold">$30.00</span><span className="text-slate-900"> for complete cleaning without liquids.</span></li>
                                <li><span className="font-semibold">$35.00</span><span className="text-slate-900"> for complete cleaning with liquids</span></li>
                            </ol>
                            {/* <table className="w-full capitalize border-solid border border-gray-200 border-collapse">
                                <thead className="text-center">
                                    <tr className="bg-sky-200">
                                        <th className="px-1 border-solid border border-gray-200">service</th>
                                        <th className="px-1 border-solid border border-gray-200">cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="odd:bg-sky-100">
                                        <td className="px-1 border-solid border border-gray-200">regular cleaning.</td>
                                        <td className="px-1 border-solid border border-gray-200 text-center">$25.00</td>
                                    </tr>
                                    <tr className="odd:bg-sky-100">
                                        <td className="px-1 border-solid border border-gray-200">regular cleaning with liquids.</td>
                                        <td className="px-1 border-solid border border-gray-200 text-center">$30.00</td>
                                    </tr>
                                    <tr className="odd:bg-sky-100">
                                        <td className="px-1 border-solid border border-gray-200">complete cleaning without liquids.</td>
                                        <td className="px-1 border-solid border border-gray-200 text-center">$30.00</td>
                                    </tr>
                                    <tr className="odd:bg-sky-100">
                                        <td className="px-1 border-solid border border-gray-200">complete cleaning with liquids</td>
                                        <td className="px-1 border-solid border border-gray-200 text-center">$35.00</td>
                                    </tr>
                                </tbody>
                            </table> */}
                        </section>
                    </header>
                    <footer className="self-center flex justify-center">
                    <button onClick={handleShowModal} className="bg-sky-500 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95">
                         Accept
                    </button>
                    </footer>
                </section>
            </div>
        )
      }
    </>
  );
};
