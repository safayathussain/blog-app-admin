import BlogForm from '@/components/blog/blogForm';
import BreadCrumb from '@/components/breadcrumb';
import { Heading } from '@/components/ui/heading'
import React from 'react'

const page = () => {
  const breadcrumbItems = [{ title: "Create Blog", link: "/dashboard/create-blog" }];
  return (
    <div>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading
          title={`Create Blog`}
          description="Write a blog"
        />
        <BlogForm initialData={''}/>
      </div>
    </div>
  )
}

export default page