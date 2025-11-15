
'use client'

import InstallForm from "./installForm"
import { cn } from "@/utils/classnames"
import { useGlobalPublicStore } from '@/context/global-public-context'

const Install = () => {

    const { systemFeatures } = useGlobalPublicStore()

    return (
        <div className={cn('flex min-h-screen w-full justify-center p-6')}>
            <div className={cn('flex w-full shrink-0 flex-col justify-evenly rounded-2xl border py-8 px-2')}>
                <div>
                    <InstallForm />
                </div>
                {!systemFeatures.branding.enabled && <div className='px-8 py-6 text-sm font-normal text-gray-500'>
                    © {new Date().getFullYear()} XXXXX, Inc. All rights reserved.
                </div>}
            </div>
        </div>
    )
}

export default Install