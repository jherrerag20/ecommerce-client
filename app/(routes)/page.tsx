import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/products-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {

    const billboard = await getBillboard("4a0bfdf3-a090-495c-bc34-552ff9478912");
    const products = await getProducts({ isFeatured : true });

    return(

        <Container >

            <div className="space-y-10 pb-10">

                <Billboard data={billboard}/>


                <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">

                    <ProductList title="Productos Principales" items={products} />

                </div>
                
            </div>

        </Container>

    );

}


export default HomePage;