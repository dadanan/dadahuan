export const tableData = () => {
  const data = {
    name: '1',
    device: '1',
    introduce: '1',
    local: '1',
    createtime: '1',
    create: '1',
    mark: '1'
  }

  return new Array(10).fill(data)
}

export const columnData = [
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'devicecount',
    label: '群内设备'
  },
  {
    prop: 'introduction',
    label: '介绍'
  },
  {
    prop: 'local',
    label: '地点'
  },
  {
    prop: 'createTime',
    label: '创建时间'
  },
  {
    prop: 'customerName',
    label: '创建人'
  },
  {
    prop: 'remark',
    label: '备注'
  }
]

export const dialogDatas = {
  create: {
    title: '添加设备集群'
  },
  detail: {
    title: '查看设备集群详情'
  },
  edit: {
    title: '编辑设备集群'
  }
}
