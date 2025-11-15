'use client'
import React, { useCallback, useEffect } from 'react'
import { useDebounceFn } from 'ahooks'
import Link from 'next/link'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '../components/base/loading'
import useDocumentTitle from '@/hooks/use-document-title'
import { validPassword } from '@/config'

// Mock functions (no real API calls)
const fetchSetupStatus = () => Promise.resolve({ step: 'not_finished' } as any)
const fetchInitValidateStatus = () => Promise.resolve({ status: 'started' } as any)
const setup = () => Promise.resolve()
const login = () => Promise.resolve({ result: 'success' })

const accountFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: '邮箱不能为空' })
    .email('邮箱格式不正确'),
  name: z.string().min(1, { message: '姓名不能为空' }),
  password: z
    .string()
    .min(8, { message: '密码长度不能少于8位' })
    .regex(validPassword, '密码必须包含大小写字母和数字'),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

const InstallForm = () => {
  useDocumentTitle('')

  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
    },
  })

  const onSubmit: SubmitHandler<AccountFormValues> = async (data) => {
    console.log('[Form Submitted - Mock]', data)
  }

  const handleSetting = async () => {
    if (isSubmitting) return
    handleSubmit(onSubmit)()
  }

  const { run: debouncedHandleKeyDown } = useDebounceFn(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSetting()
      }
    },
    { wait: 200 }
  )

  const handleKeyDown = useCallback(debouncedHandleKeyDown, [debouncedHandleKeyDown])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-2xl font-bold text-gray-900">设置管理员账户</h2>
        <p className="mt-1 text-sm text-gray-500">
          请设置您的管理员账号信息，用于首次登录系统。
        </p>
      </div>
      <div className="mt-8 grow sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative">
          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
            <div className="mb-5">
              <label htmlFor="email" className="my-2 block text-sm font-medium text-gray-900">
                邮箱
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  {...register('email')}
                  placeholder="请输入邮箱"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-[7px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.email && (
                <div className="mt-2 text-sm text-red-500">
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="name" className="my-2 block text-sm font-medium text-gray-900">
                姓名
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  {...register('name')}
                  placeholder="请输入姓名"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-[7px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.name && (
                <div className="mt-2 text-sm text-red-500">
                  <span>{errors.name.message}</span>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="my-2 block text-sm font-medium text-gray-900">
                密码
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-[7px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={showPassword ? '隐藏密码' : '显示密码'}
                  >
                    {showPassword ? '👀' : '🔒'}
                  </button>
                </div>
              </div>
              <div
                className={`mt-1 text-xs ${
                  errors.password ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                密码必须包含大小写字母和数字，且不少于8位
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSetting}
                disabled={isSubmitting}
                className={`w-full rounded-md px-4 py-2 text-center text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSubmitting
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {isSubmitting ? '处理中...' : '安装并登录'}
              </button>
            </div>
          </form>

          <div className="mt-2 block w-full text-xs text-gray-500">
            使用本产品即表示您同意我们的开源许可协议。
            &nbsp;
            <Link
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="/policies/open-source"
            >
              查看开源协议
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default InstallForm