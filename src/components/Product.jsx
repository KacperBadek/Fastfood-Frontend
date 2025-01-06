export default function Product({productData}) {
    const {name, image, description, price,} = productData;

    return (
        <div className="border border-gray-300 rounded-lg p-8 shadow-sm hover:cursor-pointer">
            <img
                src={image}
                alt="photo"
                className="w-max h-40 object-cover rounded-md mb-4 mx-auto"
            />
            <h2 className="text-lg font-semibold text-white">{name}</h2>
        </div>
    );
}
