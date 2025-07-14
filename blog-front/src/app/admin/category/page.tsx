"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ICategory } from "@/api/model/category.model";
import {
  getEntities,
  updateEntity,
  createEntity,
  deleteEntity,
  reset,
} from "@/api/shared/reducers/admin/admin.category.reducer";
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
import { ITEMS_PER_PAGE } from "@/api/shared/util/pagination.constants";

const Category = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const rowsPerPage = ITEMS_PER_PAGE;

  const categories = useAppSelector((state) => state.adminCategory.entities );
  const totalItems = useAppSelector((state) => state.adminCategory.totalItems);
  const isLoading = useAppSelector((state) => state.adminCategory.loading);
  const updateSuccess = useAppSelector((state) => state.adminCategory.updateSuccess);
  const errorMessage = useAppSelector((state) => state.adminCategory.errorMessage);

  const [currItem, setCurrItem] = useState<ICategory | null>(null);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [rank, setRank] = useState("0");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    dispatch(getEntities({ page: page, size: rowsPerPage, sort: "id" }));
  }, [page,dispatch,rowsPerPage]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("操作成功");
      onClose();
      dispatch(reset());
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [updateSuccess, errorMessage, dispatch, onClose]);

  const confirmOpenDialog = useCallback(
    (item: ICategory | null) => {
      if (item) {
        setCurrItem(item);
        setIcon(item.icon ?? "");
        setRank(String(item.rank));
        setName(item.name?? ""  );
      } else {
        setCurrItem(null);
        setIcon("");
        setRank("");
        setName("");
      }
      onOpen();
    },
    [onOpen]
  );

  const [nameError, setNameError] = useState("");
  const [rankError, setRankError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError("分类名称不能为空");
      isValid = false;
    } else {
      setNameError("");
    }

    const rankNum = Number(rank);
    if (isNaN(rankNum) || rankNum < 0) {
      setRankError("排序为自然数");
      isValid = false;
    } else {
      setRankError("");
    }
    return isValid;
  };

  const saveOrUpdate = () => {
    if (!validateForm()) {
      return;
    }
    const entity = {
      ...currItem,
      id: currItem?.id,
      icon,
      name: name.trim(),
      rank: Number(rank),
    };
    entity.id ? dispatch(updateEntity(entity)) : dispatch(createEntity(entity));
  };

  const confirmDelete = (item: ICategory) => {
    setCurrItem(item);
    setDeleteModalOpen(true);
  };

  const deleteCategory = () => {
    if (currItem) {
      dispatch(deleteEntity(currItem.id ?? 0));
      setDeleteModalOpen(false);
    }
  };

  const handleRefresh = () => {
    dispatch(getEntities({ page: page, size: rowsPerPage, sort: "id" }));
    toast.success("刷新成功");
  };

  const ActionButtons = React.memo(({ item }: { item: ICategory }) => {
    return (
      <div className="flex items-center gap-2 justify-center">
        <Tooltip content="修改分类" closeDelay={0}>
          <span
            className="cursor-pointer text-primary hover:scale-110 transition-transform duration-150"
            onClick={() => confirmOpenDialog(item)}
            onMouseLeave={(e) => e.currentTarget.blur()}
          >
            <RiEditLine size={18} />
          </span>
        </Tooltip>
        <Tooltip color="danger" content="删除分类" closeDelay={0}>
          <span
            className="cursor-pointer text-danger hover:scale-110 transition-transform duration-150"
            onClick={() => confirmDelete(item)}
            onMouseLeave={(e) => e.currentTarget.blur()}
          >
            <MdDelete size={18} />
          </span>
        </Tooltip>
      </div>
    );
  });

ActionButtons.displayName = 'ActionButtons';

  const renderCell = useCallback((item: ICategory, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return <p className="text-bold text-sm capitalize">{item.name}</p>;
      case "icon":
        return <p className="text-bold text-sm capitalize">{item.icon}</p>;
      case "rank":
        return <p className="text-bold text-sm capitalize">{item.rank}</p>;
      case "createdTime":
        return (
          <p className="text-bold text-sm capitalize">
            {formatCreatedTime(item.createdTime)}
          </p>
        );
      case "actions":
        return <ActionButtons item={item} />;
      default:
        return <>--</>;
    }
  }, [ActionButtons]);

  return (
    <div className="h-auto">
      <Table
        aria-label="分类表格"
        bottomContent={
          <div className="flex w-full justify-between items-center p-4">
            <span className="text-sm text-default-500">
              共 {totalItems} 条记录
            </span>
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="name">分类名称</TableColumn>
          <TableColumn key="icon">图标</TableColumn>
          <TableColumn key="rank">排序</TableColumn>
          <TableColumn key="createdTime">创建时间</TableColumn>
          <TableColumn key="actions" className="flex items-center gap-2" >
              操作
              <IoMdAddCircle
                size={25}
                className="text-primary cursor-pointer hover:scale-110 transition-transform duration-150"
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
          items={categories ?? []}
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

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>分类管理</ModalHeader>
              <ModalBody>
                <Input
                  label="分类名称"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  isRequired
                  isInvalid={!!nameError}
                  errorMessage={nameError}
                />
                <Input
                  label="图标"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
                <Input
                  label="排序"
                  type="number"
                  value={rank}
                  onChange={(e) => {
                    setRank(e.target.value);
                    setRankError("");
                  }}
                  isRequired
                  isInvalid={!!rankError}
                  errorMessage={rankError}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={saveOrUpdate}>
                  保存
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={deleteModalOpen} onOpenChange={setDeleteModalOpen} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                删除确认
              </ModalHeader>
              <ModalBody>
                <p>确定要删除分类 &quot;{currItem?.name}&quot; 吗？</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="danger" onPress={deleteCategory}>
                  删除
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  );
};

export default Category;
