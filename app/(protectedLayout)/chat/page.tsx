


const ChatPage = async() => {

    const currentStep = 1;
    const totalStep = 10;
    const progressPercent = (currentStep / totalStep) * 100;


    return (
        <>
        <div className="w-full h-screen py-8 overflow-hidden bg-linear-to-b from-[#f0effa] via-sky-50 to-white 
            flex flex-col items-center"
        >
            <div id="top-area"
                className="w-full h-80 overflow-hidden flex flex-col px-8 py-0"
            >
                <div className="flex items-center justify-between">
                    <img src="/logo@2x.png" alt="logo" className="h-[64px] w-[72px]" />
                    <div id="patient-info" className="flex-1 flex items-center justify-evenly ml-4 text-[26px] font-semibold text-gray-600">
                        <div className="flex items-center gap-4">
                            <img src="/user.svg" alt="patient-icon" />
                            <span>迪丽热巴</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <img src="/user.svg" alt="patient-icon" />
                            <span>32 岁</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <img src="/user.svg" alt="patient-icon" />
                            <span>心血管内科</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 p-4 bg-white/90 rounded-lg text-[26px] font-medium text-gray-600">
                    为方便医生全面了解病情、提供更好诊疗，麻烦您如实回答以下问题，感谢配合！
                </div>
                <div className="mt-8 space-y-3">
                    <div className="flex items-center text-[26px] font-semibold text-gray-600">
                        <div className="flex items-center justify-center gap-6">
                            <span>答题进度</span>
                            <div>
                                <span className="text-blue-400 text-[30px]">
                                    {currentStep}
                                </span>
                                <span className="font-medium text-gray-400">/{totalStep}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-4 rounded-full bg-blue-100 overflow-hidden">
                        <div
                        className="h-full rounded-full bg-linear-to-r from-[#8B81FF] via-[#8891f7] to-[#62C3FC] transition-all"
                        style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div id="chat-area"
                className="w-full mt-8 
                overflow-y-scroll"
            >
                
            </div>


            <div id="control-area"
                className="w-full"
            >
                输入区域上一题下一题
            </div>

        </div>
        </>
    )
}

export default ChatPage