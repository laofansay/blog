"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  getEntities,
  updateEntity,
  createEntity,
  deleteEntity,
  reset,
} from "@/api/shared/reducers/admin/admin.tag.reducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ITag } from "@/api/model/tag.model";
import {
  ASC,
  DESC,
  ITEMS_PER_PAGE,
} from "@/api/shared/util/pagination.constants";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { RiEditLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { formatCreatedTime } from "@/api/config/constants";

const Tag = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [currTag, setCurrTag] = useState<ITag | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Redux 数据
  const tagsLists = useAppSelector((state) => state.adminTag.entities);
  const totalItems = useAppSelector((state) => state.adminTag.totalItems);
  const isLoading = useAppSelector((state) => state.adminTag.loading);
  const errorMessage = useAppSelector((state) => state.adminTag.errorMessage);
  const updateSuccess = useAppSelector((state) => state.adminTag.updateSuccess);
  const updating = useAppSelector((state) => state.adminTag.updating);

  // 控制模态框
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 计算总页数
  const pages = useMemo(
    () => (totalItems ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 0),
    [totalItems]
  );

  const handleRefresh = () => {
    dispatch(getEntities({ page: 1 , size: ITEMS_PER_PAGE, sort: "id" }));
    toast.success("刷新成功");
  };
  // 重新获取数据
  const refreshTable = useCallback(() => {
    dispatch(getEntities({ page: 1 , size: ITEMS_PER_PAGE, sort: "id" }));
  }, [dispatch, page]);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("操作成功");
      refreshTable();
      onClose();
      dispatch(reset());
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [updateSuccess, errorMessage, dispatch, onClose, refreshTable]);

  // 处理分页
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // 打开新增/编辑模态框
  const confirmOpenDialog = useCallback(
    (tag: ITag | null) => {
      setCurrTag(tag || { id: undefined, name: "", icon: "", linkUrl: "" });
      onOpen();
    },
    [onOpen]
  );

  // 保存或更新
  const saveOrUpdate = () => {
    if (!currTag) return;

    const entity = { ...currTag };
    entity.id == null
      ? dispatch(createEntity(entity))
      : dispatch(updateEntity(entity));
  };

  // 处理输入变化
  const handleChange = (field: keyof ITag, value: string) => {
    setCurrTag((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // 渲染表格单元格
  const renderCell = useCallback(
    (tag: ITag, columnKey: React.Key) => {
      switch (columnKey) {
        case "name":
        case "icon":
        case "linkUrl":
          const value = tag[columnKey as keyof ITag];
          return (
            <p className="text-sm capitalize">{value?.toString() ?? "--"}</p>
          );
        case "createdTime":
          return (
            <p className="text-sm">{formatCreatedTime(tag.createdTime)}</p>
          );
        case "actions":
          return (
            <div className="flex items-center gap-2 justify-center">
              <Tooltip content="修改标签" closeDelay={0}>
                <span
                  className="cursor-pointer"
                  onClick={() => confirmOpenDialog(tag)}
                >
                  <RiEditLine />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="删除标签" closeDelay={0}>
                <span
                  className="cursor-pointer text-danger"
                  onClick={() => {
                    setCurrTag(tag);
                    setDeleteModalOpen(true);
                  }}
                >
                  <MdDelete />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return <>--</>;
      }
    },
    [confirmOpenDialog]
  );

  return (
    <div>
      <Table
        aria-label="标签管理表"
        bottomContent={
          <div className="flex justify-between items-center p-4">
            <span className="text-sm">共 {totalItems} 条记录</span>
            {pages > 0 && (
              <Pagination
                total={pages}
                page={page}
                onChange={handlePageChange}
                isCompact
                showControls
                showShadow
                color="primary"
              />
            )}
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="name">标签名称</TableColumn>
          <TableColumn key="icon">图标</TableColumn>
          <TableColumn key="linkUrl">链接</TableColumn>
          <TableColumn key="createdTime">创建时间</TableColumn>
          <TableColumn key="actions" className="flex items-center gap-2">
            操作
            <IoMdAddCircle
              size={25}
              className="text-primary cursor-pointer"
              onClick={() => confirmOpenDialog(null)}
            />
             <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              onClick={handleRefresh}
              className="text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
            </Button>
          </TableColumn>
        </TableHeader>

        <TableBody
          items={tagsLists ?? []}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 编辑/新增模态框 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>标签管理</ModalHeader>
          <ModalBody>
            <Input
              label="名称"
              value={currTag?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Input
              label="图标"
              value={currTag?.icon || ""}
              onChange={(e) => handleChange("icon", e.target.value)}
            />
            <Input
              label="链接"
              value={currTag?.linkUrl || ""}
              onChange={(e) => handleChange("linkUrl", e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={onClose}>
              取消
            </Button>
            <Button color="primary" onClick={saveOrUpdate}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 删除确认模态框 */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalContent>
          <ModalHeader>确认删除</ModalHeader>
          <ModalBody>
            确定要删除标签 &quot;{currTag?.name}&quot; 吗？此操作无法撤销。
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={() => setDeleteModalOpen(false)}>
              取消
            </Button>
            <Button
              color="danger"
              onClick={() => {
                if (currTag) {
                  dispatch(deleteEntity(currTag.id?? 0  ));
                  setDeleteModalOpen(false);
                }
              }}
            >
              删除
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Tag;
