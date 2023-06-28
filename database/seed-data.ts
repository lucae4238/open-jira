// archivo para llenar la base durante  desarrollo 
interface SeedData {
  entries: SeedEntry[]
}


//no utilizamos uuid pq no van a ser de ese tipo
interface SeedEntry {
  description: string
  status: string,
  createdAt: number
}


export const seedData: SeedData = {
  entries: [
    {
      description: "P lorem ipsum",
      status: "pending",
      createdAt: Date.now()
    },
    {
      description: "IP: lorem ipsum",
      status: "in-progress",
      createdAt: Date.now() - 100000
    },
    {
      description: "F lorem ipsum",
      status: "finished",
      createdAt: Date.now() - 1000000
    },

  ]
}