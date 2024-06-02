import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import TabBar from "@/components/TabBar";
import Block from "@/components/Block";
import InfoListItem from "@/components/InfoListItem";
import { EditSalaryModal } from "@/components/EditSalaryModal";
import useModal from "@/hooks/useModal";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase";
import useEmployeeSalary from "@/hooks/useEmployeeSalary";
import { EmployeeSettingsTab } from "@/components/EmployeeSettingsTab";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ salary, id }: { salary: number, id: string }) {
  const { showModal } = useModal();

  useEmployeeSalary({ employeeId: id, initialData: salary })

  return (
    <>
      <title>Warp Interview</title>
      <Layout>
        <div className='flex flex-col items-start gap-[20px]'>
          <div className='relative w-[100px] h-[100px] rounded-[20px] overflow-clip shadow-input'>
            <Image
              src={'https://warp-documents-public.s3.amazonaws.com/google-oauth2%7C100405129643874851679/images/34cf609e-7b77-4b33-b81c-c38d661a4761.webp'}
              alt={'Khal'}
              width={100}
              height={200}
            />
          </div>
          <div className='flex items-center gap-[30px] w-full'>
            <div className='flex-1 flex flex-col items-start gap-[5px]'>
              <h1>Khal Drogo</h1>
              <div className='flex items-center gap-[10px]'>
                <div
                  className='text-status-2 text-center text-g32 flex items-center px-[7px] h-[25px] bg-white rounded-[7px] box-border border border-g88'
                >
                  🇺🇸{'\u0020'} US Employee
                </div>
              </div>
            </div>
          </div>
        </div>
        <TabBar tabs={["Overview", "Taxes", "Settings"]}>
          <h1>Overview</h1>
          <h1>Taxes</h1>
          <EmployeeSettingsTab employeeId={id} />
        </TabBar>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const employeeId = context.params?.employeeId;

  if (employeeId != '1') {
    return {
      notFound: true,
    }
  }

  const supabase = createClient(context)

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', employeeId)
    .single()

  return {
    props: { salary: data.salary, id: '1' }, // will be passed to the page component as props
  }
}