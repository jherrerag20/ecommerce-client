"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

const formSchema = z.object({
    fullName: z.string().min(1),
    phoneNumber: z.string().min(1),
    street: z.string().min(1),
    number: z.string().min(1),
    neighborhood: z.string().min(1),
    postalCode: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    references: z.string().optional(),
    deliveryType: z.enum(["Sucursal", "Envío"]),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
    onSubmit: (data: OrderFormValues) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
    const [loading, setLoading] = useState(false);

    const items = useCart((state) => state.items);

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            street: "",
            number: "",
            neighborhood: "",
            postalCode: "",
            city: "",
            state: "",
            references: "",
            deliveryType: "Sucursal", // Valor por defecto
        },
    });

    const handleSubmit = async (data: OrderFormValues) => {
        try {
            setLoading(true);
            // Aquí puedes enviar los datos al servidor o realizar cualquier acción necesaria
            // Por ejemplo, puedes llamar a la función `onSubmit` que pasaste como prop
            onSubmit(data);
            toast.success("Pedido realizado con éxito");
        } catch (error) {
            toast.error("Algo salió mal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Información de Pedido" description="Completa los datos de entrega" />
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full">
                    
                    <FormField control={form.control} name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre Completo:</FormLabel>
                                <Input disabled={loading} placeholder="Nombre completo" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teléfono:</FormLabel>
                                <Input disabled={loading} placeholder="Número de teléfono" {...field} type="number" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField control={form.control} name="deliveryType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de entrega:</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={field.value} placeholder="Selecciona el tipo de entrega" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sucursal">Sucursal</SelectItem>
                                        <SelectItem value="Envío">Envío</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Calle:</FormLabel>
                                <Input disabled={loading} placeholder="Calle" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número:</FormLabel>
                                <Input disabled={loading} placeholder="Número" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="neighborhood"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Colonia:</FormLabel>
                                <Input disabled={loading} placeholder="Colonia" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código Postal:</FormLabel>
                                <Input disabled={loading} placeholder="Código Postal" {...field} type="number" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ciudad:</FormLabel>
                                <Input disabled={loading} placeholder="Ciudad" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado:</FormLabel>
                                <Input disabled={loading} placeholder="Estado" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="references"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Referencias:</FormLabel>
                                <Input disabled={loading} placeholder="Referencias" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="mt-10 w-full" type="submit">Realizar Pedido</Button>
                </form>
            </Form>
            <Separator />
        </>
    );
};
