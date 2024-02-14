import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div className="flex-1 space-y-4 py-4 px-8 w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          {/* <CalendarDateRangePicker /> */}
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          overview
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          analytics
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          reports
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          notifications
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
