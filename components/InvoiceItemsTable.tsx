import {InvoiceConstants, InvoiceItem, InvoiceItemsTableType, InvoiceUser} from "@/src/types/general";
import {BsFillTrashFill, BsPlusCircleFill} from "react-icons/bs";
import React, {ChangeEvent, useState} from "react";
import StyledSelect, {textToOptions} from "@/components/lib/StyledSelect";
import StyledInput from "@/components/lib/StyledInput";

export const emptyInvoiceItem = {
    lineNatureIndicator: 'SERVICE',
    productCodeCategory: 'OWN',
    productCodeValue: '',
    quantity: 1,
    unitOfMeasure: "OWN",
    unitPrice: 0,
    lineNetAmountData: 0,
    lineVatRate: InvoiceConstants.invoice.items.lineVatRate[0],
    lineVatData: 0,
    lineGrossAmountData: 0,
    lineDescription: "",
};

export default function InvoiceItemsTable ({
    items,
    setItems
}: InvoiceItemsTableType) {
    const [currentItem, setCurrentItem] =
        useState<InvoiceItem>({...emptyInvoiceItem} as InvoiceItem)

    const deleteItem = (index: number) => {
        setItems(items.splice(index, 1));
    };

    const changeType = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.value;
        setCurrentItem((currentItem: InvoiceItem) => {
            const obj = {...currentItem};
            // @ts-ignore
            obj[key] = value;
            return obj;
        });
    };

    const addItem = () => {
        setItems([...items, currentItem]);
        setCurrentItem({...emptyInvoiceItem} as InvoiceItem);
    };

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 pb-6">
            <tr>
                <th scope="col" className="lineNatureIndicator">Type</th>
                <th scope="col" className="productCodeCategory advanced">Code (TESZOR)</th>
                <th scope="col" className="productCodeValue">Product Code</th>
                <th scope="col" className="lineDescription">Description</th>
                <th scope="col" className="quantity">Quantity</th>
                <th scope="col" className="unitOfMeasure">Unit</th>
                <th scope="col" className="unitPrice">Unit</th>
                <th scope="col" className="lineNetAmount">Net Amount</th>
                <th scope="col" className="vatPercentage">VAT(%)</th>
                <th scope="col" className="lineVatAmount">VAT(Ft)</th>
                <th scope="col" className="lineGrossAmountNormal">Gross Total</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
            items.map((item, index)=>
                <tr className={index % 2 ? "bg-white border-b dark:bg-gray-800 dark:border-gray-600 h-[30px]" : "border-b dark:border-gray-600 h-[30px]"}>
                    <td> {item.lineNatureIndicator}</td>
                    <td> {item.productCodeCategory}</td>
                    <td> {item.productCodeValue}</td>
                    <td> {item.lineDescription}</td>
                    <td> {item.quantity}</td>
                    <td> {item.unitOfMeasure}</td>
                    <td> {item.unitPrice}</td>
                    <td> {item.lineNetAmountData}</td>
                    <td> {item.lineVatRate}</td>
                    <td> {item.lineVatData}</td>
                    <td> {item.lineGrossAmountData}</td>
                    <td> <BsFillTrashFill className="cursor-pointer ml-2" onClick={() => deleteItem(index)} /> </td>
                </tr>
            )}
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td>
                    <StyledSelect
                        type="text" name="lineNatureIndicator"
                        options={textToOptions(InvoiceConstants.invoice.items.lineNatureIndicator, undefined)}
                        value={currentItem.lineNatureIndicator ? currentItem.lineNatureIndicator : undefined}
                        onSelect={(e) => changeType(
                            e as unknown as ChangeEvent<HTMLInputElement>, 'lineNatureIndicator')}
                        label="Type"
                    />
                </td>
                <td>
                    <StyledSelect
                        type="text" name="productCodeCategory"
                        options={textToOptions(InvoiceConstants.invoice.items.productCodeCategory, undefined)}
                        value={currentItem.productCodeCategory ? currentItem.productCodeCategory : undefined}
                        onSelect={(e) => changeType(
                            e as unknown as ChangeEvent<HTMLInputElement>, 'productCodeCategory')}
                        label="Code (TESZOR)"
                    />
                </td>
                <td>
                    <StyledInput
                        type="text" name="productCodeValue"
                        value={currentItem.productCodeValue}
                        onChange={(e) => changeType(e, 'productCodeValue')}
                        label="Product Code"
                    />
                </td>
                <td>
                    <StyledInput
                        type="text" name="lineDescription"
                        value={currentItem.lineDescription}
                        onChange={(e) => changeType(e, 'lineDescription')}
                        label="Description"
                    />
                </td>
                <td>
                    <StyledInput
                        type="number" name="quantity"
                        value={currentItem.quantity}
                        onChange={(e) => changeType(e, 'quantity')}
                        label="Quantity"
                    />
                </td>
                <td>
                    <StyledSelect
                        type="text" name="unitOfMeasure"
                        options={textToOptions(InvoiceConstants.invoice.items.unitOfMeasure, undefined)}
                        value={currentItem.unitOfMeasure ? currentItem.unitOfMeasure : undefined}
                        onSelect={(e) => changeType(
                            e as unknown as ChangeEvent<HTMLInputElement>, 'unitOfMeasure')}
                        label="Unit"
                    />
                </td>
                <td>
                    <StyledInput
                        type="number" name="unitPrice"
                        value={currentItem.unitPrice}
                        onChange={(e) => changeType(e, 'unitPrice')}
                        label="Unit Price (Ft)"
                    />
                </td>
                <td>
                    <StyledInput
                        type="number" name="lineNetAmountData"
                        value={currentItem.lineNetAmountData}
                        onChange={(e) => changeType(e, 'lineNetAmountData')}
                        label="Unit Net Price"
                    />
                </td>

                <td className="min-w-[60px]">
                    <StyledSelect
                        type="text" name="lineVatRate"
                        options={textToOptions(InvoiceConstants.invoice.items.lineVatRate as unknown as string[],
                            undefined)}
                        value={currentItem.lineVatRate ? currentItem.lineVatRate : undefined}
                        onSelect={(e) => changeType(
                            e as unknown as ChangeEvent<HTMLInputElement>, 'lineVatRate')}
                        label="Vat Rate (%)"
                    />
                </td>
                <td>
                    <StyledInput
                        type="number" name="lineVatData"
                        value={currentItem.lineVatData}
                        onChange={(e) => changeType(e, 'lineVatData')}
                        label="VAT (Ft)"
                    />
                </td>
                <td>
                    <StyledInput
                        type="number" name="lineGrossAmountData"
                        value={currentItem.lineGrossAmountData}
                        onChange={(e) => changeType(e, 'lineGrossAmountData')}
                        label="Gross Total"
                    />
                </td>
                <td>
                    <BsPlusCircleFill className="cursor-pointer ml-2 text-2xl m-1" onClick={() => addItem()} />
                </td>
            </tr>
            </tbody>
        </table>
    )
}