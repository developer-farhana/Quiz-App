import ReactLogo from '/react.svg';

export default function Loading() {
    return (
        <section className="bg-gradient-to-r from-pink-500 to-rose-500 h-screen flex flex-col justify-center items-center space-y-5">
            <img
                src={ReactLogo}
                alt="React Logo"
                className="animate-spin hover:animate-none transition-all size-24 cursor-pointer"
            />
            <div className="flex items-center gap-3">
                <h3 className=' text-white text-2xl font-bold  space-x-1'>
                    Loading Quiz
                    <span className=" ml-2 size-2 inline-block bg-white  rounded-full animate-bounce"></span>
                    <span className="size-2 inline-block bg-white  rounded-full animate-bounce"></span>
                    <span className="size-2 inline-block bg-white  rounded-full animate-bounce"></span>
                    </h3>

                {/* <div className="flex gap-1 mt-4">
                    <div className="h-3 w-3 bg-white  rounded-full animate-bounce"></div>
                    <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
                    <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
                </div> */}
            </div>
        </section>
    )
}
